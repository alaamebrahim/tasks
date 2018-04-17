import { Component, OnInit } from '@angular/core';
import { RolesService } from '../roles/roles.service';
import { Permission } from '../permissions/permission.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  public permissions: Permission[];
  public page: any;
  constructor(
    private roleService: RolesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPermissions();
  }

  getPermissions() {
    this.permissions = null; // for show spinner each time
    this.roleService.getPermissions().subscribe(permissions => this.permissions = permissions);
  }

  onAddPermission() {
    this.router.navigate(['users/add-permission']);
  }

  /**
     * Even listener for changes in pagination
     * @param event
     */
    public onPageChanged(event) {
      this.page = event;
      this.getPermissions();
    }

}
