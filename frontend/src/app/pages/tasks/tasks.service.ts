import { Injectable } from '@angular/core';
import {ApiRequestService} from '../../shared/services/api-request.service';
import {Task} from './task.model';

@Injectable()
export class TasksService {

  constructor(
    private apiRequestService: ApiRequestService,
  ) { }

  public addTask(data: Task) {
    return this.apiRequestService.post('tasks/add-task', data);
  }

  public getTasks() {
    return this.apiRequestService.get('tasks/get-tasks');
  }

  public getTasksByStatus(completed: number) {
    const url = completed === 1 ? 'tasks/get-completed-tasks' : 'tasks/get-uncompleted-tasks';
    return this.apiRequestService.get(url);
  }

  public updateTask(task: Task) {
    // console.log(task);
    return this.apiRequestService.post('tasks/update-task', task);
  }
}
