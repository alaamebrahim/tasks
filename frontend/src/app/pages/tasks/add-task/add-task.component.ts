import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../users/user.model';
import { UsersService } from '../../users/users.service';
import { TasksService } from '../tasks.service';
import { Task } from '../task.model';
import { NotifyUserService } from '../../../shared/services/notify-user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  public form: FormGroup;
  public users: User[];
  public working = false;
  public attachment: string;
  @ViewChild('fileInput') fileInput;

  constructor(
    public fb: FormBuilder,
    public usersService: UsersService,
    public tasksService: TasksService,
    public notifyService: NotifyUserService,
    public router: Router,
  ) {
    this.form = this.fb.group({
      id: null,
      title: [null, Validators.compose([Validators.required])],
      start_date: [null, Validators.compose([Validators.required])],
      end_date: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      priority: [1],
      user_id: [null, Validators.compose([Validators.required])],
      attachment: null
    });
  }

  ngOnInit() {
    this.getAllUsers();
  }

  onSaveTask() {
    const me = this;
    me.working = true;
    this.tasksService.addTask(this.form.value)
      .subscribe((response) => {
        if (response.success === true) {
          // console.log(response.message);
          this.notifyService.notifyUser('general.messages.saved');
          this.router.navigate(['tasks']);
        } else {
          this.notifyService.notifyUser('general.messages.error');
        }
        me.working = false;
      });
  }

  /**
   * Get users for dropdown menu
   */
  getAllUsers(): void {
    this.usersService.getUsers().subscribe((response) => {
      // console.log(response);
      this.users = response['users'];
    });
  }

  addFile(): void {
    this.working = true;
    const fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      const fileToUpload = fi.files[0];
      // this.form.controls['picture'].setValue(fileToUpload);
      // console.log(fileToUpload);
      this.usersService.uploadTaskAttachment(fileToUpload).subscribe(response => {
        if (response.success === true) {
          this.form.controls['attachment'].setValue(response.message);
          // console.log(this.form.value);
          this.attachment = response.message;
        }
        this.working = false;
      });
    } else {
      this.working = false;
    }

  }
}
