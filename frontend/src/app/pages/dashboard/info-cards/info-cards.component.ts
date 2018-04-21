import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { orders, products, customers, refunds } from '../dashboard.data';
import { DashboardService } from '../dashboard.service';
import { UserInfoService } from '../../../shared/services/user-info.service';

@Component({
  selector: 'app-info-cards',
  templateUrl: './info-cards.component.html',
  styleUrls: ['./info-cards.component.scss']
})
export class InfoCardsComponent implements OnInit {
  public tasks: any[];
  public completedCount = 0;
  public uncompletedCount = 0;
  public colorScheme = {
    domain: ['#999']
  };
  public autoScale = true;
  @ViewChild('resizedDiv') resizedDiv: ElementRef;
  public previousWidthOfResizedDiv = 0;
  public settings: Settings;
  constructor(
    public appSettings: AppSettings,
    private dashboardService: DashboardService,
    private userInfoService: UserInfoService
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.getLastTasks();
    this.prepareCompletedTasksCount();
    this.prepareUncompletedTasksCount();
  }

  public getLastTasks() {
    const currentUser = this.userInfoService.getUserInfo();
    if (currentUser !== undefined) {
      if (currentUser.role === 'root' || currentUser.role === 'admin') {
        this.dashboardService.getLastTasks().subscribe(tasks => {
          this.tasks = tasks;
          // console.log(tasks);
        });
      } else {
        this.dashboardService.getUserLastTasks(currentUser.id).subscribe(tasks => {
          this.tasks = tasks;
        });
      }
    }
  }

  prepareCompletedTasksCount() {
    const currentUser = this.userInfoService.getUserInfo();
    if (currentUser !== undefined) {
      if (currentUser.role === 'root' || currentUser.role === 'admin') {
        this.dashboardService.getAllCompletedTasksCount().subscribe(count => {
          this.completedCount = count;
        });
      } else {
        this.dashboardService.getUserCompletedTasksCount(currentUser.id).subscribe(count => {
          this.completedCount = count;
        });
      }
    }
  }

  prepareUncompletedTasksCount() {
    const currentUser = this.userInfoService.getUserInfo();
    if (currentUser !== undefined) {
      if (currentUser.role === 'root' || currentUser.role === 'admin') {
        this.dashboardService.getAllUncompletedTasksCount().subscribe(count => {
          this.uncompletedCount = count;
        });
      } else {
        this.dashboardService.getUserUncompletedTasksCount(currentUser.id).subscribe(count => {
          this.uncompletedCount = count;
        });
      }
    }
  }

  public onSelect(event) {
    console.log(event);
  }

}
