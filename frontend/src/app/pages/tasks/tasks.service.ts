import {Injectable} from '@angular/core';
import {ApiRequestService} from '../../shared/services/api-request.service';
import {Task} from './task.model';

@Injectable()
export class TasksService {

    constructor(
        private apiRequestService: ApiRequestService,
    ) {
    }

    public addTask(data: Task) {
        return this.apiRequestService.post('tasks/add-task', data);
    }

    public getTasks(projectId: any): Promise<Task[]> {
        return new Promise<Task[]>((res, rej) => {
            this.apiRequestService.get('tasks/get-tasks/' + projectId)
                .subscribe(response => {
                    if (response.success === true) {
                        res(response.data);
                    } else {
                        rej(response.success);
                    }
                }, error1 => rej(error1));
        });
    }

    public getTasksByStatus(completed: number, projectId: any): Promise<Task[]> {
        const url = completed === 1 ? 'tasks/get-completed-tasks/' + projectId : 'tasks/get-uncompleted-tasks/' + projectId;
        return new Promise<Task[]>((res, rej) => {
            this.apiRequestService.get(url)
                .subscribe(response => {
                    if (response.success === true) {
                        res(response.data);
                    } else {
                        rej(response.success);
                    }
                }, error1 => rej(error1));
        });
    }

    public updateTask(task: Task) {
        // console.log(task);
        return this.apiRequestService.post('tasks/update-task', task);
    }

    public updateTaskProgress(task: Task) {
        // console.log(task);
        return this.apiRequestService.post('tasks/update-task-progress', task);
    }

    public deleteTask(task: Task) {
        return this.apiRequestService.post('tasks/delete-task', task);
    }
}
