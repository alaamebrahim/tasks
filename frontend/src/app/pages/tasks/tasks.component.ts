import { Component } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { DragulaService } from 'ng2-dragula';

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
    private dragula: DragulaService
  ) {
    this.settings = this.appSettings.settings;
    this.dragula.drop.subscribe((value) => {
      console.log(value);
    });
  }
}
