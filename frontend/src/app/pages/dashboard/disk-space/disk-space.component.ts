import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { UserInfoService } from '../../../shared/services/user-info.service';

@Component({
  selector: 'app-disk-space',
  templateUrl: './disk-space.component.html'
})
export class DiskSpaceComponent implements OnInit {
  private completedCount = 0;
  private uncompletedCount = 0;
  public data: any[];
  public showLegend = false;
  public gradient = true;
  public colorScheme = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B']
  };
  public showLabels = true;
  public explodeSlices = true;
  public doughnut = false;
  @ViewChild('resizedDiv') resizedDiv: ElementRef;
  public previousWidthOfResizedDiv = 0;

  constructor(
    private dashboardService: DashboardService,
    private userInfoService: UserInfoService
  ) { }

  ngOnInit() {
    this.setChartData();
  }

  setChartData() {
    this.prepareCompletedTasksCount();
    this.prepareUncompletedTasksCount();
    this.data = [
      {
        name: 'عدد المهام المنتهية',
        value: this.completedCount
      },
      {
        name: 'عدد المهام الغير منتهية',
        value: this.uncompletedCount
      }
    ];
  }

  prepareCompletedTasksCount() {
    const currentUser = this.userInfoService.getUserInfo();
    if (currentUser !== undefined) {
      if (currentUser.role === 'root' || currentUser.role === 'admin') {
        this.dashboardService.getAllCompletedTasksCount().subscribe(count => {
          this.completedCount = count;
          const d = {
            name: 'عدد المهام المنتهية',
            value: this.completedCount
          };
          this.data.push(d);
        });
      } else {
        this.dashboardService.getUserCompletedTasksCount(currentUser.id).subscribe(count => {
          this.completedCount = count;
          const d = {
            name: 'عدد المهام المنتهية',
            value: this.completedCount
          };
          this.data.push(d);
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
          const d = {
            name: 'عدد المهام الغير منتهية',
            value: this.uncompletedCount
          };
          this.data.push(d);
        });
      } else {
        this.dashboardService.getUserUncompletedTasksCount(currentUser.id).subscribe(count => {
          this.uncompletedCount = count;
          const d = {
            name: 'عدد المهام الغير منتهية',
            value: this.uncompletedCount
          };
          this.data.push(d);
        });
      }
    }
  }

  public onSelect(event) {
    // console.log(event);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewChecked() {
    if (this.previousWidthOfResizedDiv !== this.resizedDiv.nativeElement.clientWidth) {
      setTimeout(() => this.data = [...this.data]);
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }

}
