import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Params, ActivatedRoute } from '@angular/router';
import { LoginService } from '../api/login.service';
import { UsersService } from '../api/users.service';
import { UserInfoService } from '../user-info.service';
import { ApiRequestService } from '../api/api-request.service';

@Injectable()
export class ProfileResolver implements Resolve<any> {
  id: number;
  user: any;
  constructor(
    private userInfoService: UserInfoService,
    private router: Router,
    private usersService: UsersService,
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const me = this;
    const userData = this.userInfoService.getUserInfo();
    if (userData && userData.id > 0) {
      const id: string = route.paramMap.get('id');
      if (userData.id.toString() === id) {
        return me.usersService.getUserData(id);
      }
      me.router.navigate(['unauthorized']);
    }
    me.router.navigate(['unauthorized']);
  }
}
