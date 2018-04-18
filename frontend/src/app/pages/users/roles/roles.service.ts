import { Injectable } from '@angular/core';
import { Permission } from '../permissions/permission.model';
import { ApiRequestService } from '../../../shared/services/api-request.service';
import { Role } from './role.model';

@Injectable()
export class RolesService {

  constructor(
    private apiRequestService: ApiRequestService
  ) { }

  public getRoles() {
    return this.apiRequestService.get('roles/get-roles');
  }

  public getPermissions() {
    return this.apiRequestService.get('roles/get-permissions');
  }

  public addPermission(permission: Permission) {
    return this.apiRequestService.post('roles/add-permission', permission);
  }

  public AddRole(role: Role) {
    return this.apiRequestService.post('roles/add-role', role);
  }

  public UpdateRole(role: Role) {
    return this.apiRequestService.post('roles/edit-role', role);
  }
}
