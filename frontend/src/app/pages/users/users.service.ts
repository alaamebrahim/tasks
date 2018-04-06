import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { ApiRequestService } from '../../shared/services/api-request.service';
import { Role } from '../login/role.model';

@Injectable()
export class UsersService {
    public url = "api/users";
    constructor(
        public http: HttpClient,
        private apiRequestService: ApiRequestService
    ) { }

    getUsers(): Observable<User[]> {
        return this.apiRequestService.get('users/get-users');
    }

    addUser(user: User) {
        // return this.http.post(this.url, user);
        return this.apiRequestService.post('users/add-user', user);
    }

    updateUser(user: User) {
        return this.http.put(this.url, user);
    }

    deleteUser(id: number) {
        return this.http.delete(this.url + "/" + id);
    }

    getRoles(): Observable<Role[]> {
        return this.apiRequestService.get('users/get-roles');
    }
}
