import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { UserInfoService } from '../../../shared/services/user-info.service';
import { Task } from '../../tasks/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  private tasks: any[];
  constructor(
    private userInfoService: UserInfoService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    const currentUser = this.userInfoService.getUserInfo();
    if (currentUser !== null) {
      if (currentUser.role === 'root' || currentUser.role === 'admin') {
        this.dashboardService.getLastTasks().subscribe(tasks => {
          this.tasks = tasks;
        });
      } else {
        this.dashboardService.getUserLastTasks(currentUser.id).subscribe(tasks => {
          this.tasks = tasks;
        });
      }
    }
  }
}
