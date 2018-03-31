import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';

// tslint:disable-next-line:import-blacklist
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UserInfoService, LoginInfoInStorage } from '../user-info.service';
import { ApiRequestService } from './api-request.service';
import { SnotifyService } from 'ng-snotify';
import { Http } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app-config';

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

    constructor(
        private router: Router,
        private userInfoService: UserInfoService,
        private apiRequest: ApiRequestService,
        private http: HttpClient,
        private appConfig: AppConfig,
        private notify: SnotifyService) {
    }

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
                                    me.notify.error('Bad credentials or deactivated account, please contact site administrator.');
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
            // Will use this BehaviorSubject to emit data that we want after ajax login attempt
            const loginDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
            let loginInfoReturn: LoginInfoInStorage; // Object that we want to send back to Login Page
            return this.apiRequest.post('auth/login', bodyData)
                .toPromise()
                .then(jsonResp => {
                    console.log(jsonResp.login);
                    if (jsonResp !== undefined && jsonResp !== null && jsonResp.login === 'token_generated') {
                        // Create a success object that we want to send back to login page
                        console.log(jsonResp);
                        loginInfoReturn = this.saveUserDataByToken(jsonResp.token);

                        // store username and jwt token in session storage to keep user logged in between page refreshes
                        this.userInfoService.storeUserInfo(JSON.stringify(loginInfoReturn.user));
                    } else {
                        // console.log(jsonResp);
                        // Here means user exists but credentials fails.
                        loginInfoReturn = {
                            'success': false,
                            'message': 'Login failed',
                            'landingPage': 'login',
                            'exists': true
                        };
                    }
                    loginDataSubject.next(loginInfoReturn);
                    return loginInfoReturn;

                },
                    err => {
                        console.log(err);
                        // New user
                        return loginInfoReturn = {
                            'success': false,
                            'exists': false,
                            'message': err.url + ' >>> ' + err.statusText + '[' + err.status + ']',
                            'landingPage': '/social-register'
                        };
                    });
            // return loginDataSubject;
        }
    }

    /**
     * Get logged in user data using token returned from backend
     * @param token
     */
    saveUserDataByToken(token: string) {
        let loginInfoReturn: LoginInfoInStorage; // Object that we want to send back to Login Page
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        if (token !== null) {
            headers = headers.append('Authorization', 'Bearer ' + token);
        }
        this.http.get(this.appConfig.baseApiPath + 'auth/user', {headers: headers}).subscribe(Response => {
            console.log(Response);
            /*loginInfoReturn = {
                'success': true,
                'message': jsonResp.message,
                'landingPage': this.landingPage,
                'exists': true,
                'user': {
                    'id': null,
                    'userName': null,
                    'email': null,
                    'displayName': jsonResp.item.fullName,
                    'token': jsonResp.item.token,
                    'role': jsonResp.item.roles,
                    'image': jsonResp.item.image,
                    'locale': jsonResp.item.locale,
                }
            };*/
        });
        return loginInfoReturn;
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
