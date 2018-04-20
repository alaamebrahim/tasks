import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../shared/services/api-request.service';

@Injectable()
export class DashboardService {

  constructor(
    private apiRequestService: ApiRequestService
  ) { }

  public getAllCompletedTasksCount() {
    return this.apiRequestService.get('dashboard/get-all-completed-tasks-count');
  }

  public getAllUncompletedTasksCount() {
    return this.apiRequestService.get('dashboard/get-all-uncompleted-tasks-count');
  }

  public getUserCompletedTasksCount(id: number) {
    return this.apiRequestService.get('dashboard/get-user-completed-tasks-count/' + id);
  }

  public getUserUncompletedTasksCount(id: number) {
    return this.apiRequestService.get('dashboard/get-user-completed-tasks-count/' + id);
  }

  public getLastTasks() {
    return this.apiRequestService.get('dashboard/get-last-tasks');
  }

  public getUserLastTasks(id) {
    return this.apiRequestService.get('dashboard/get-user-last-tasks/' + id);
  }

}
