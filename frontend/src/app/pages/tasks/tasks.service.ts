import {Injectable} from '@angular/core';
import {ApiRequestService} from '../../shared/services/api-request.service';
import {Task} from './task.model';
import {UserPermissions} from "./user-permissions.model";
import {UserInfoService} from "../../shared/services/user-info.service";

@Injectable()
export class TasksService {
    public currentUserId: number;
    public currentUserRole: string;

    constructor(
        private apiRequestService: ApiRequestService,
        private userInfoService: UserInfoService,
    ) {
        this.currentUserId = this.userInfoService.getUserInfo().id;
        this.currentUserRole = this.userInfoService.getUserInfo().role;
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

    getUserPermissionOnTask(task: Task, permission: string): boolean {

        if (this.currentUserRole === 'root' || this.currentUserRole === 'admin') {
            return true;
        }

        const permissions: UserPermissions[] = JSON.parse(task.permissions);
        console.log(permissions);
        if (!permissions || permissions.length === 0) {
            return false;
        }

        let perm = false;
        permissions.forEach(userPermissions => {
            if (userPermissions.user_id === this.currentUserId) {
                switch (permission) {
                    case 'update_progress':
                        if (userPermissions.permissions.update_progress === true) {
                            perm = true;
                        }
                        break;
                    case 'can_comment':
                        if (userPermissions.permissions.can_comment === true) {
                            perm = true;
                        }
                        break;
                    case 'send_notifications':
                        if (userPermissions.permissions.send_notifications === true) {
                            perm = true;
                        }
                        break;
                    case 'view_attachments':
                        if (userPermissions.permissions.view_attachments === true) {
                            perm = true;
                        }
                        break;
                    default:
                        perm = false;
                }
            }
        });
        return perm;
    }

    /**
     * Returns array of allowed_users ids
     * @param task
     */
    getAllowedUsersPerTask(task: Task) {
        const user_ids = [];
        const permissions: UserPermissions[] = JSON.parse(task.permissions);
        if (!permissions || permissions.length === 0) {
            return user_ids;
        }

        permissions.forEach(userPermissions => {
            if (userPermissions.enabled !== undefined && userPermissions.enabled !== false) {
                user_ids.push(userPermissions.user_id);
            }
        });
        return user_ids;
    }

}
