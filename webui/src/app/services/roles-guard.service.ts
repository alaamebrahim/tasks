import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {UserInfoService} from './user-info.service';
import {LoginService} from './api/login.service';


@Injectable()
export class RolesGuardService implements CanActivate {

    constructor(
        private userInfoService: UserInfoService,
        private router: Router,
        private loginService: LoginService) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        const userInfo: any = this.userInfoService.getUserInfo();
        const userRoles: any = userInfo !== null ? userInfo.role as string : null;
        const routeRoles: string[] = route.data['roles'] !== undefined ? route.data['roles'] : route.data[0]['roles'];
        // console.log(route);
        const roles: string = routeRoles.join();
        // console.log(userRoles);
        if (userRoles !== null) {
            for (const i in userRoles) {
                if (roles.includes(userRoles[i]['name'])) {
                    return true;
                }
            }
        } else {
            if (roles.includes('guest') && this.loginService.socialUserData !== undefined) {
                // console.log(this.loginService.socialUserData);
                return true;
            }
        }
        this.router.navigate(['unauthorized']);
        console.log('User does not have enough authorizations to login to this page.');
        return false;
    }

}
