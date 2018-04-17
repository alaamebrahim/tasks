import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NotifyUserService } from '../../../../shared/services/notify-user.service';
import { RolesService } from '../../roles/roles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.scss']
})
export class AddPermissionComponent implements OnInit {
  private form: FormGroup;
  private working = false;

  constructor(
    private fb: FormBuilder,
    private notifyService: NotifyUserService,
    private roleService: RolesService,
    private router: Router
  ) {
    this.form = this.fb.group({
      id: null,
      name: [null, Validators.compose([Validators.required])],
      translation: [null, Validators.compose([Validators.required])]
    });
   }

  ngOnInit() {
  }

  onSavePermission() {
    const me = this;
    me.working = true;
    this.roleService.addPermission(this.form.value)
      .subscribe((response) => {
        if (response.success === true) {
          // console.log(response.message);
          this.notifyService.notifyUser('general.messages.saved');
          this.router.navigate(['users/permissions']);
        } else {
          this.notifyService.notifyUser('general.messages.error');
        }
        me.working = false;
      });
  }

}
