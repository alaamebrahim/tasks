import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user.model';
import { Role } from '../../login/role.model';
import { ApiRequestService } from '../../../shared/services/api-request.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  public form: FormGroup;
  public passwordHide = true;
  private roles: Role[];

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    public fb: FormBuilder,
    private apiRepuestService: ApiRequestService,
    private userService: UsersService
  ) {
    this.form = this.fb.group({
      id: null,
      username: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      password: [null],
      first_name: null,
      last_name: null,
      birthday: null,
      gender: null,
      picture: null,
      company: null,
      position: null,
      email: [null, Validators.compose([Validators.required, Validators.email])],
      phone_no: null,
      address: null,
      facebook: null,
      twitter: null,
      google: null,
      is_active: true,
      is_blocked: false,
      role_id: null,
      created_at: null,
      updated_at: null,
      country: null,
    });
  }

  ngOnInit() {
    this.getAllRoles();
    if (this.user) {
      console.log(this.user);
      this.user.password = null;
      this.form.setValue(this.user);
    } else {
      this.user = new User();
    }
  }

  getAllRoles() {
    this.userService.getRoles().subscribe(roles => this.roles = roles);
  }

  saveUser(data: User) {
    console.log(data);
  }

  close(): void {
    this.dialogRef.close();
  }

}
