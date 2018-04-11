import { Injectable } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserInfoService } from './user-info.service';

@Injectable()
export class PermissionsService {

  constructor(
    private permissionsService: NgxPermissionsService,
    private userInfoService: UserInfoService,
  ) {  }

  setUserPermissions() {
    const perm = this.userInfoService.getUserInfo() === null ? 'GUEST' : this.userInfoService.getUserInfo().role;
      // console.log(perm);
      this.permissionsService.loadPermissions([perm]);
  }

}
