import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Permission } from '../../pages/users/permissions/permission.model';

export interface UserInStorage {
    id: number;
    userName: string;
    email: string;
    displayName: string;
    role: string;
    permissions: Permission[];
    token: string;
    image: string;
    locale: string;
    position: string;
    created_at: Date;
}

export interface LoginInfoInStorage {
    success: boolean;
    message: string;
    landingPage: string;
    user?: UserInStorage;
    exists: boolean;
}

@Injectable()
export class UserInfoService {

    public currentUserKey = 'currentUser';
    public storage: Storage = sessionStorage; // <--- you may switch between sessionStorage or LocalStrage (only one place to change)

    constructor() {
    }

    // Store userinfo from session storage
    storeUserInfo(userInfoString: any) {
        this.storage.setItem(this.currentUserKey, JSON.stringify(userInfoString));
    }

    // Remove userinfo from session storage
    removeUserInfo() {
        this.storage.removeItem(this.currentUserKey);
    }

    // Get userinfo from session storage
    getUserInfo(): UserInStorage | null {
        try {
            const userInfoString: string = this.storage.getItem(this.currentUserKey);
            if (userInfoString) {
                const userObj: UserInStorage = JSON.parse(this.storage.getItem(this.currentUserKey));
                return userObj;
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
    }

    isLoggedIn(): boolean {
        return this.storage.getItem(this.currentUserKey) ? true : false;
    }

    // Get User's Display name from session storage
    getUserName(): string {
        const userObj: UserInStorage = this.getUserInfo();
        if (userObj !== null) {
            return userObj.displayName;
        }
        return 'no-user';
    }

    getStoredToken(): string | null {
        const userObj: UserInStorage = this.getUserInfo();
        if (userObj !== null) {
            return userObj.token;
        }
        if (sessionStorage.getItem('userToken') !== null) {
            return sessionStorage.getItem('userToken');
        }
        return null;
    }
}
