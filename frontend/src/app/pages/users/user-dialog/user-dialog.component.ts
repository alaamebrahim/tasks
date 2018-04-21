import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user.model';
import { Role } from '../../login/role.model';
import { ApiRequestService } from '../../../shared/services/api-request.service';
import { UsersService } from '../users.service';
import { NotifyUserService } from '../../../shared/services/notify-user.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  public form: FormGroup;
  public passwordHide = true;
  public roles: Role[];
  public uploadedFile: File = null;
  public loading = false;
  @ViewChild('fileInput') fileInput;

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    public fb: FormBuilder,
    private apiRepuestService: ApiRequestService,
    private userService: UsersService,
    private notifyService: NotifyUserService
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
      role_name: null,
      created_at: null,
      updated_at: null,
      country: null,
    });
  }

  ngOnInit() {
    this.getAllRoles();
    if (this.user) {
      // console.log(this.user);
      this.user.password = null;
      this.form.setValue(this.user);
    } else {
      this.user = new User();
    }
  }

  getAllRoles() {
    this.userService.getRoles().subscribe(roles => this.roles = roles);
  }

  /**
 * add new user to db
 * @param userdata
 */
  public addUser(userdata: User) {
    this.loading = true;
    this.userService.addUser(userdata).subscribe(response => {
      if (response.success === true) {
        this.notifyService.notifyUser('general.messages.saved');
        this.loading = false;
      } else {
        this.loading = false;
        this.notifyService.notifyUser('general.messages.error');
      }
    }, error => {
      this.loading = false;
      console.log(error);
      this.notifyService.notifyUser('general.messages.error');
    });
  }

  /**
   * update user data
   * @param userdata
   */
  public updateUser(userdata: User) {
    this.loading = true;
    this.userService.updateUser(userdata).subscribe(response => {
      if (response.success === true) {
        // console.log(response.message);
        this.notifyService.notifyUser('general.messages.saved');
        this.loading = false;
      } else {
        this.loading = false;
        this.notifyService.notifyUser(response.message);
      }
    }, error => {
      this.loading = false;
      console.log(error);
      this.notifyService.notifyUser('general.messages.error');
    });
  }

  saveUser() {
    if (this.form.value) {
      // console.clear();
      // console.log(this.form.value);
      // console.log(this.form.controls['id']);
      if (this.uploadedFile !== null) {
        this.uploadFile().subscribe(response => {
          // console.log(response);
          if (response.success === true) {
            this.form.controls['picture'].setValue(response.message);
            if (this.form.controls['id'].value === null) {
              this.addUser(this.form.value);
            } else {
              this.updateUser(this.form.value);
            }
          }
        });
      } else {
        if (this.form.controls['id'].value === null) {
          this.addUser(this.form.value);
        } else {
          this.updateUser(this.form.value);
        }
      }
    } else {
      console.log('not valid form');
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  addFile(): void {
    const fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      const fileToUpload: File = fi.files[0];
      const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/svg'];
      if (allowed.indexOf(fileToUpload.type) === -1) {
        this.notifyService.notifyUser('users.errors.picture.type');
      } else {
        this.uploadedFile = fileToUpload;
      }
    }
  }

  uploadFile() {
    // this.form.controls['picture'].setValue(fileToUpload);
    // console.log(this.form.value);
    // console.log(fileToUpload);
    if (this.uploadedFile !== null) {
      return this.userService.uploadUserPicture(this.uploadedFile);
    }
  }

}
