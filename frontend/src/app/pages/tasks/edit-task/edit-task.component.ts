import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../users/user.model';
import { UsersService } from '../../users/users.service';
import { TasksService } from '../tasks.service';
import { Task } from '../task.model';
import { NotifyUserService } from '../../../shared/services/notify-user.service';
import { Router } from '@angular/router';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'edit-add-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  private form: FormGroup;
  private users: User[];
  private saved = false;

  constructor(
    private dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) private task: Task,
    private fb: FormBuilder,
    private usersService: UsersService,
    private tasksService: TasksService,
    private notifyService: NotifyUserService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      id: null,
      title: [null, Validators.compose([Validators.required])],
      start_date: [null, Validators.compose([Validators.required])],
      end_date: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      priority: [1],
      user_id: [null, Validators.compose([Validators.required])],
      cancelled: null,
      created_at: null,
      updated_at: null,
      first_name: null, // This will be removed on save
      last_name: null, // this will be removed on save
      progress: null, // thi will be removed on save
      completed: null, // thi will be removed on save
      notifications: null // thi will be removed on save
    });
  }

  ngOnInit() {
    this.getAllUsers(); // Gets users for dropdown list
    // this.clearUnusedTaskItems(); // Clears unused items
    // this.prepareUserId();
    this.form.setValue(this.task);
    // console.log(this.task);
  }

  prepareUserId() {
    const user_ids: any[] = [];
    user_ids.push(this.task['user_id']);
    this.task['user_id'] = user_ids;
  }

  onSaveTask() {
    this.tasksService.updateTask(this.form.value)
      .subscribe((response) => {
        if (response.success === true) {
          this.saved = true;
          // console.log(response.message);
          this.notifyService.notifyUser('general.messages.saved');
          this.router.navigate(['tasks']);
        } else {
          this.notifyService.notifyUser('general.messages.error');
        }
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

}
