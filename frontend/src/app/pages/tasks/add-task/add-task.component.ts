import { Component, OnInit } from '@angular/core';
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

  private form: FormGroup;
  private users: User[];
  private working =  false;

  constructor(
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
      user_id: [null, Validators.compose([Validators.required])]
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
          console.log(response.message);
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

}
