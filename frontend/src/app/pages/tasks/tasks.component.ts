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

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  public icons = ['home', 'person', 'alarm', 'work', 'mail', 'favorite'];
  public colors = ['accent', 'primary', 'warn'];
  public settings: Settings;
  private tasks: Task[];
  private page: any;
  public step = 0;

  constructor(
    public appSettings: AppSettings,
    private dragula: DragulaService,
    private router: Router,
    private tasksService: TasksService,
    private notifyService: NotifyUserService,
    public dialog: MatDialog,
  ) {
    this.settings = this.appSettings.settings;
    this.getAllTasks();
  }

  getAllTasks() {
    this.tasks = null;
    this.tasksService.getTasks().subscribe((response) => {
      // console.log(response);
      this.tasks = response;
    });
  }

  onFilterTasks(status: number) {
    this.tasks = null;
    this.tasksService.getTasksByStatus(status).subscribe((response) => {
      // console.log(response);
      this.tasks = response.tasks;
    });
  }

  onAddNewTaskClick(): void {
    this.router.navigate(['tasks/add-task']);
  }

  onProgressChange(task: Task) {
    this.tasksService.updateTask(task).subscribe((response) => {
      if (response.success === true) {
        this.notifyService.notifyUser('general.messages.saved');
      } else {
        this.notifyService.notifyUser('general.messages.error');
      }
    });
  }

  onDeleteTaskClick(taskId: number) {

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
      data: taskData
    });

    dialogRef.afterClosed().subscribe(user => {
      this.getAllTasks();
    });
  }
}
