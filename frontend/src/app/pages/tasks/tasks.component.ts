import { Component } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { DragulaService } from 'ng2-dragula';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  public icons = ['home', 'person', 'alarm', 'work', 'mail', 'favorite'];
  public colors = ['accent', 'primary', 'warn'];
  public settings: Settings;

  constructor(
    public appSettings: AppSettings,
    private dragula: DragulaService,
    private router: Router
  ) {
    this.settings = this.appSettings.settings;
    this.dragula.drop.subscribe((value) => {
      console.log(value);
    });
  }

  onAddNewTaskClick(): void {
    this.router.navigate(['tasks/add-task']);
  }
}
