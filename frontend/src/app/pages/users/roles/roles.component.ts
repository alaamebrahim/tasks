import { Component, OnInit } from '@angular/core';
import { Role } from './role.model';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { RolesService } from './roles.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { EditRoleComponent } from './edit-role/edit-role.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  public roles: Role[];
  public page: any;
  public settings: Settings;

  constructor(
    public appSettings: AppSettings,
    private roleService: RolesService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.roles = null; // for show spinner each time
    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
      // console.log(roles);
    });

  }

  onAddRole() {
    this.router.navigate(['users/add-role']);
  }

  onShowPermissions() {
    this.router.navigate(['users/permissions']);
  }

  /**
     * Opens role dialog
     * @param userdata
     */
    public openRoleDialog(roleData) {
      const dialogRef = this.dialog.open(EditRoleComponent, {
          data: roleData,
          minWidth: '50%'
      });
  }

  /**
     * Even listener for changes in pagination
     * @param event
     */
  public onPageChanged(event) {
    this.page = event;
    this.getRoles();
    if (this.settings.fixedHeader) {
      document.getElementById('main-content').scrollTop = 0;
    } else {
      document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
    }
  }

}
