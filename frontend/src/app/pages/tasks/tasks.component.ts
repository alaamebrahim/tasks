import { Component } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { DragulaService } from 'ng2-dragula';
import { Router } from '@angular/router';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

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

  constructor(
    public appSettings: AppSettings,
    private dragula: DragulaService,
    private router: Router,
    private tasksService: TasksService
  ) {
    this.settings = this.appSettings.settings;
    this.getAllTasks();
    this.dragula.drop.subscribe((value) => {
      console.log(value);
    });
  }

  getAllTasks() {
    this.tasksService.getTasks().subscribe((response) => {
      console.log(response);
      this.tasks = response;
    });
  }

  onAddNewTaskClick(): void {
    this.router.navigate(['tasks/add-task']);
  }

  /**
     * Even listener for changes in pagination
     * @param event
     */
    public onPageChanged(event) {
      this.page = event;
      /*if (this.settings.fixedHeader) {
          document.getElementById('main-content').scrollTop = 0;
      } else {
          document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
      }*/
  }
}
