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

}
