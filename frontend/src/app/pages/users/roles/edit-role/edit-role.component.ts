import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifyUserService } from '../../../../shared/services/notify-user.service';
import { RolesService } from '../roles.service';
import { Router } from '@angular/router';
import { Permission } from '../../permissions/permission.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Role } from '../../../login/role.model';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {

  public form: FormGroup;
  public working = false;
  public permissions: Permission[];

  constructor(
    public dialogRef: MatDialogRef<EditRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public role: Role,
    private fb: FormBuilder,
    private notifyService: NotifyUserService,
    private roleService: RolesService,
    private router: Router
  ) {
    this.form = this.fb.group({
      id: null,
      name: [null, Validators.compose([Validators.required])],
      translation: [null, Validators.compose([Validators.required])],
      permissions: null
    });
  }

  ngOnInit() {
    this.getPermissions();
    if (this.role) {
      this.form.setValue(this.role);
      // console.log(this.form.value);
    }
  }

  getPermissions() {
    this.permissions = null; // for show spinner each time
    this.roleService.getPermissions().subscribe(permissions => this.permissions = permissions);
  }

  onSaveRole() {
    const me = this;
    me.working = true;
    this.roleService.UpdateRole(this.form.value)
      .subscribe((response) => {
        if (response.success === true) {
          // console.log(response.message);
          this.notifyService.notifyUser('general.messages.saved');
          this.router.navigate(['users/roles']);
        } else {
          this.notifyService.notifyUser('general.messages.error');
        }
        me.working = false;
      });
  }

}
