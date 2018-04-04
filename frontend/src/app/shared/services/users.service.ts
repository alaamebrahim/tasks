import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs/Rx';
import { ApiRequestService } from './api-request.service';
import { LoginInfoInStorage } from './user-info.service';


export interface SocialRegisterInfoReturn {
    success: boolean;
    user?: any;
    landingPage: string;
}

@Injectable()
export class UsersService {
    private user: any;
    private success = false;

    constructor(
        private apiRequest: ApiRequestService,
        ) { }

    findAll(page?: number, size?: number): Observable<any> {
        // Create Request URL params
        const me = this;
        let params: HttpParams = new HttpParams();
        params = params.append('page', typeof page === 'number' ? page.toString() : '0');
        params = params.append('size', typeof size === 'number' ? size.toString() : '1000');

        const usersList = new Subject<any>(); // Will use this subject to emit data that we want
        this.apiRequest.get('api/users/list', params)
            .subscribe(jsonResp => {
                const returnObj = jsonResp.items.map(function (v, i, a) {
                    const newRow = Object.assign({}, v, {});
                    return newRow;
                });
                usersList.next(returnObj); // incidentList is a Subject and emits an event thats being listened to by the components
            });

        return usersList;
    }

    getAllRoles(): Promise<any[]> {
        const rolesList = new Observable<Array<any>>();
        return this.apiRequest.get('api/roles/list')
            .toPromise()
            .then(response => response);
    }

    saveUserData(user: any) {
        const me = this;
        const loginDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
        let registerInfoReturn: SocialRegisterInfoReturn; // Object that we want to send back to Login Page

        user.fbId = user.id;
        user.userName = user.email;
        user.fbToken = user.token;
        user.password = user.fbId + user.email;
        user.fullName = user.name;
        delete user.id; delete user.token;
        this.apiRequest.post('api/user-add', user)
            .subscribe(response => {
                if (response.operationStatus === 'SUCCESS') {
                    registerInfoReturn = {
                        'success': true,
                        'user': user,
                        'landingPage': '/home/dashboard'
                    };
                } else {
                    registerInfoReturn = {
                        'success': false,
                        'user': user,
                        'landingPage': '/login'
                    };
                }
                loginDataSubject.next(registerInfoReturn);
            }, error => {
                console.log(error);
            });
        return loginDataSubject;
    }

    updateProfile(user: any) {
        const me = this;
        // delete unnecessary data
        // delete user.userName;
        delete user.role;
        delete user.active;
        delete user.blocked;
        // delete user.fbId;
        delete user.fbToken;
        delete user.image;
        delete user.password;
        delete user.provider;

        console.log(user);
        return this.apiRequest.post('api/user-update', user)
            .toPromise()
            .then(
                response => response,
                error => { console.log(error); }
            );
    }


    updateUserState(user: any) {
        const me = this;

        return this.apiRequest.post('api/user-change-state', user)
            .toPromise()
            .then(
                response => response,
                error => { console.log(error); }
            );
    }

    updateUserActiveState(id: number, active: boolean) {
        const me = this;
        return me.apiRequest.get('api/users/update-active-status/' + id + '/' + active)
            .toPromise()
            .then(
                response => response,
                error => { console.log(error); }
            );
    }

    updateUserBlockState(id: number, block: boolean) {
        console.log('here');
        const me = this;
        return me.apiRequest.get('api/users/update-block-status/' + id + '/' + block)
            .toPromise()
            .then(
                response => response,
                error => { console.log(error); }
            );
    }

    getUserData(id: string): any {
        const params: HttpParams = new HttpParams();
        params.append('id', id);

        return this.apiRequest.get('api/users/data/' + id);
    }

    /**
     * Returns role name
     * @param id
     */
    getUserRoleName(id: number) {
        let roleName = '';
        this.apiRequest.get('users/get-role-by-user-id/' + id)
            .subscribe(resp => {
                roleName = resp.name;
            });
        return roleName;
    }

}
