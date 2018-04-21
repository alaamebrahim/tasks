import { Component } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { DragulaService } from 'ng2-dragula';
import { Router } from '@angular/router';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { NotifyUserService } from '../../shared/services/notify-user.service';
import { MatDialog } from '@angular/material';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { User } from '../users/user.model';
import { AddNotificationComponent } from './add-notification/add-notification.component';
import { Notification } from './add-notification/notification.model';
import { UsersService } from '../users/users.service';
import { UserInfoService } from '../../shared/services/user-info.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { ShowAttachmentComponent } from './show-attachment/show-attachment.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  public icons = ['home', 'person', 'alarm', 'work', 'mail', 'favorite'];
  public colors = ['accent', 'primary', 'warn'];
  public settings: Settings;
  public tasks: Task[];
  public users: any[];
  public page: any;
  public step = 0;
  public searchText: number;
  public currentUserRole: string;
  public currentUserId: number;

  constructor(
    public appSettings: AppSettings,
    private dragula: DragulaService,
    private router: Router,
    private tasksService: TasksService,
    private notifyService: NotifyUserService,
    private usersService: UsersService,
    private userInfoService: UserInfoService,
    private permissionsService: NgxPermissionsService,
    public dialog: MatDialog,
  ) {
    this.settings = this.appSettings.settings;
    this.currentUserId = this.userInfoService.getUserInfo().id;
    this.currentUserRole = this.userInfoService.getUserInfo().role;
    this.getAllTasks();
    if (this.permissionsService.getPermissions().user_view !== undefined) {
      this.getUsers();
    }
  }

  getAllTasks() {
    this.searchText = 0;
    this.tasks = null;
    this.tasksService.getTasks().subscribe((response) => {
      // console.log(response);
      this.tasks = response;
    });
  }

  /**
     * Get all users
     */
  public getUsers(): void {
    this.users = null; // for show spinner each time
    this.usersService.getUsers().subscribe((user) => {
      this.users = user.users;
      // console.log(this.users);
    });
  }

  onFilterTasks(status: number) {
    this.tasks = null;
    this.tasksService.getTasksByStatus(status).subscribe((response) => {
      // console.log(response);
      this.tasks = response;
    });
  }

  onAddNewTaskClick(): void {
    this.router.navigate(['tasks/add-task']);
  }

  onProgressChange(task: Task) {
    this.tasksService.updateTaskProgress(task).subscribe((response) => {
      if (response.success === true) {
        this.notifyService.notifyUser('general.messages.saved');
      } else {
        this.notifyService.notifyUser('general.messages.error');
      }
    });
  }

  onSendNotificationClick(task: Task) {
    // console.log(task);
    const notification = new Notification();
    notification.task_id = task.id;
    notification.user_id = task.user_id;
    notification.id = null;
    notification.text = null;
    // console.log(notification);

    const dialogRef = this.dialog.open(AddNotificationComponent, {
      data: notification,
      minWidth: '50%'
    });

    dialogRef.afterClosed().subscribe(response => {
      this.getAllTasks();
    });
  }

  onDeleteTaskClick(task: Task) {
    this.tasksService.deleteTask(task).subscribe(response => {
      if (response.success === true) {
        // console.log(response.message);
        this.notifyService.notifyUser('general.messages.saved');
        this.getAllTasks();
      } else {
        this.notifyService.notifyUser('general.messages.error');
      }
      this.getUsers();
    });
  }

  /**
     * Even listener for changes in pagination
     * @param event
     */
  public onPageChanged(event) {
    this.page = event;
  }

  /**
     * Opens user dialog
     * @param userdata
     */
  public onEditTaskClick(taskData: Task) {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: taskData,
      minWidth: '50%'
    });

    dialogRef.afterClosed().subscribe(user => {
      this.getAllTasks();
    });
  }

  /**
     * Opens user dialog
     * @param userdata
     */
  public onShowAttachment(taskData: Task) {
    const dialogRef = this.dialog.open(ShowAttachmentComponent, {
      data: taskData,
      minWidth: '80%'
    });
  }
}
