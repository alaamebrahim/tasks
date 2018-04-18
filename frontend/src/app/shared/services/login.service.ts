import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';

// tslint:disable-next-line:import-blacklist
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UserInfoService, LoginInfoInStorage } from './user-info.service';
import { ApiRequestService } from './api-request.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app-config';
import { UsersService } from './users.service';
import { Permission } from '../../pages/users/permissions/permission.model';
import { Role } from '../../pages/login/role.model';
import { PermissionsService } from './permissions.service';

export interface LoginRequestParam {
    email: string;
    password: string;
}

export interface SocialLoginRequestParam {
    email: string;
    fbId: string;
}

@Injectable()
export class LoginService {

    public landingPage = '/home/dashboard';
    public socialUserData: any;
    role: Role;
    permission: Permission[];

    constructor(
        private router: Router,
        private userInfoService: UserInfoService,
        private apiRequest: ApiRequestService,
        private http: HttpClient,
        private appConfig: AppConfig,
        private permissionsService: PermissionsService
    ) { }

    performLogin(userData: any) {
        const me = this;
        me.checkUserExists(userData).then(resp => {
            if (resp === false) {
                me.socialUserData = userData;
                me.router.navigate(['/social-register']);
                return;
            } else {
                this.getToken(userData.email, userData.id + userData.email)
                    .then(response => {
                        if (response) {
                            // console.log(response);
                            // User doesn't exist in db.
                            if (response.success !== true) {
                                if (response.exists === false) {
                                    me.socialUserData = userData;
                                    me.router.navigate([resp.landingPage]);
                                    return;
                                } else {
                                    console.error('Bad credentials or deactivated account, please contact site administrator.');
                                    return;
                                }
                            }
                            // User exists and login success.
                            this.router.navigate([response.landingPage]);
                        }
                    }, error => {
                        // general error happened
                        console.log(error);
                    });
            }
        });
    }


    getToken(email: string, password: string) {
        const me = this;
        const bodyData: LoginRequestParam = {
            'email': email,
            'password': password,
        };
        if (bodyData !== null) {
            return this.apiRequest.post('auth/login', bodyData)
                .toPromise()
                .then(jsonResp => jsonResp, err => console.log(err));
        }
    }

    /**
     * Get logged in user data using token returned from backend
     * @param token
     */
    getUserDataByToken(token: string) {
        return this.apiRequest.get('auth/user')
            .toPromise()
            .then(resp => resp, error => console.log(error));
    }

    /**
     * Saves user info in session
     * @param userData
     * @param token
     */
    saveUserDataInSession(userData: any, token: string) {
        const me = this;

        // Get user permissions
        me.getUserPermissions(userData.data.id).subscribe(resp => {
            // console.log(resp);
            me.permission = resp;
            // Will use this BehaviorSubject to emit data that we want after ajax login attempt
            const loginDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
            let loginInfoReturn: LoginInfoInStorage; // Object that we want to send back to Login Page
            if (userData.message === 'authenticated_user') {
                loginInfoReturn = {
                    'success': true,
                    'message': userData.message,
                    'landingPage': me.landingPage,
                    'exists': true,
                    'user': {
                        'id': userData.data.id,
                        'userName': userData.data.name,
                        'email': userData.data.email,
                        'displayName': userData.data.first_name + ' ' + userData.data.last_name,
                        'position': userData.data.position,
                        'created_at': userData.data.created_at,
                        'token': token,
                        'role': userData.data.role_name,
                        'permissions': me.permission,
                        'image': userData.data.picture,
                        'locale': null,
                    }
                };
                // console.log(loginInfoReturn);
                // console.log(JSON.stringify(loginInfoReturn));
                // console.log(loginInfoReturn);
                this.userInfoService.storeUserInfo(loginInfoReturn.user);
                this.permissionsService.setUserPermissions();
                this.router.navigate(['/']);
                return loginInfoReturn;
            }
        });
    }

    /**
     * Get current user role
     * @param id
     */
    getUserRole(id: number) {
        return this.apiRequest.get('users/get-role-by-id/' + id);
    }

    /**
     * Get logged user permissions
     * @param id
     */
    getUserPermissions(id: number) {
        return this.apiRequest.get('users/get-user-permissions/' + id);
    }


    logout(navigatetoLogout = true): void {
        // clear token remove user from local storage to log user out
        this.userInfoService.removeUserInfo();
        if (navigatetoLogout) {
            this.router.navigate(['logout']);
        }
    }

    checkUserExists(userData: any) {
        return this.apiRequest.get('api/users/check-user-existance/' + userData.email)
            .toPromise()
            .then(resp => {
                return resp;
            });
    }
}
