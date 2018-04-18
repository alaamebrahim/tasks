import { Injectable } from '@angular/core';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { UserInfoService } from './user-info.service';
import { Permission } from '../../pages/users/permissions/permission.model';

@Injectable()
export class PermissionsService {

  constructor(
    private permissionsService: NgxPermissionsService,
    private roleService: NgxRolesService,
    private userInfoService: UserInfoService,
  ) { }

  setUserPermissions() {
    const perm = this.userInfoService.getUserInfo() === null ? 'GUEST' : this.userInfoService.getUserInfo().permissions;

    // Do we have logged in user?
    if (this.userInfoService.getUserInfo() !== null) {
      const perms = [];
      // get all permissions.
      const permissions = this.userInfoService.getUserInfo().permissions;
      // console.log(permissions);
      permissions.forEach(function (permission) {
        // console.log(permission);
        perms.push(permission.name);
      });
      // console.log(perms);
      this.permissionsService.loadPermissions(perms);
      this.roleService.flushRoles();
      this.roleService.addRole(this.userInfoService.getUserInfo().role, perms);
      // console.log(this.roleService.getRoles());

    }

  }

}
