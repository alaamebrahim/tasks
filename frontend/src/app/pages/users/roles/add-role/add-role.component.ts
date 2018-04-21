import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifyUserService } from '../../../../shared/services/notify-user.service';
import { RolesService } from '../roles.service';
import { Router } from '@angular/router';
import { Permission } from '../../permissions/permission.model';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  public form: FormGroup;
  public working = false;
  public permissions: Permission[];

  constructor(
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
  }

  getPermissions() {
    this.permissions = null; // for show spinner each time
    this.roleService.getPermissions().subscribe(permissions => this.permissions = permissions);
  }

  onSaveRole() {
    const me = this;
    me.working = true;
    // console.log(this.form.value);
    this.roleService.AddRole(this.form.value)
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
