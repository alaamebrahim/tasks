import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user.model';
import { ApiRequestService } from '../../shared/services/api-request.service';
import { Role } from '../login/role.model';

@Injectable()
export class UsersService {
    constructor(
        public http: HttpClient,
        private apiRequestService: ApiRequestService
    ) { }

    getUsers() {
        return this.apiRequestService.get('users/get-users');
    }

    addUser(user: User) {
        // return this.http.post(this.url, user);
        return this.apiRequestService.post('users/add-user', user);
    }

    updateUser(user: User) {
        return this.apiRequestService.post('users/update-user', user);
    }

    uploadUserPicture(picture: File) {
        const fd = new FormData();
        fd.append('picture', picture);
        // console.log(fd);
        return this.apiRequestService.postFormData('users/upload-image', fd);
    }

    uploadTaskAttachment(picture: File) {
        const fd = new FormData();
        fd.append('attachment', picture);
        // console.log(fd);
        return this.apiRequestService.postFormData('tasks/upload-attachment', fd);
    }

    deleteUser(user: User) {
        return this.apiRequestService.post('users/delete-user', user);
    }

    blockUser(user: User) {
        return this.apiRequestService.post('users/update-user-block-status', user);
    }

    getRoles(): Observable<Role[]> {
        return this.apiRequestService.get('users/get-roles');
    }
}
