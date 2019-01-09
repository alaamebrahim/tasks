import {Injectable} from '@angular/core';
import {ApiRequestService} from '../../shared/services/api-request.service';
import {Project} from './project.model';
import {NotifyUserService} from '../../shared/services/notify-user.service';

@Injectable()
export class ProjectsService {

    projects: Project[];

    constructor(
        private apiRequestService: ApiRequestService,
        private notificationService: NotifyUserService
    ) {
    }

    addProject(data: any): any {
        return this.apiRequestService.post('projects/add-project', data);
    }

    public getProjects() {
        return this.apiRequestService.get('projects/get-projects');
    }

    public updateProject(project: Project) {
        return this.apiRequestService.post('projects/update-project', project);
    }

    public deleteProject(project: Project) {
        return this.apiRequestService.post('projects/delete-project', project);
    }

    uploadProjectImage(fileToUpload: File): any {
        const fd = new FormData();
        fd.append('image', fileToUpload);
        return this.apiRequestService.postFormData('projects/upload-image', fd);
    }

    getProjectsList(): Promise<Project[]> {
        const me = this;
        return new Promise((res, rej) => {
            this.apiRequestService.get('projects/get-projects').subscribe(response => {
                res(response);
            }, error => {
                console.error(error);
                me.notificationService.notifyUser('general.messages.error');
                rej(error);
            });
        });
    }

    getProjectById(projectId: any): Promise<Project> {
        const me = this;
        return new Promise((res, rej) => {
            this.apiRequestService.get('projects/get-project/' + projectId).subscribe(response => {
                console.log(response)
                if (response.success === 'true') {
                    response.data.allowed_users = JSON.parse(response.data.allowed_users);
                    res(response.data);
                } else {
                    rej('لا يوجد بيانات للعرض');
                }
            }, error => {
                console.error(error);
                me.notificationService.notifyUser('general.messages.error');
                rej(error);
            });
        });
    }

}
