import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { UserInfoService, LoginInfoInStorage } from './user-info.service';
import { AppConfig } from '../../app-config';
import { NotifyUserService } from './notify-user.service';


@Injectable()
export class ApiRequestService {

    constructor(
        private appConfig: AppConfig,
        private http: HttpClient,
        private router: Router,
        private userInfoService: UserInfoService,
        private notifyService: NotifyUserService
    ) {
    }

    /**
     * This is a Global place to add all the request headers for every REST calls
     */
    getHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        const token = this.userInfoService.getStoredToken();
        headers = headers.append('Content-Type', 'application/json');
        if (token !== null) {
            headers = headers.append('Authorization', 'Bearer ' + token);
        }
        return headers;
    }

    get(url: string, urlParams?: HttpParams): Observable<any> {
        const me = this;
        return this.http.get(this.appConfig.baseApiPath + url, { headers: this.getHeaders(), params: urlParams })
            .catch(function (error: any) {
                console.log('Some error in catch');
                if (error.status === 401 || error.status === 403) {
                    // me.router.navigate(['/login']);
                    me.notifyService.notifyUser('user.unauthorized');
                }
                return [];
            });
    }

    post(url: string, body: Object): Observable<any> {
        const me = this;
        // console.log(JSON.stringify(body));
        return this.http.post(this.appConfig.baseApiPath + url, JSON.stringify(body), { headers: this.getHeaders() })
            .catch(function (error: any) {
                if (error.status === 401) {
                    // me.router.navigate(['/login']);
                    me.notifyService.notifyUser('user.unauthorized');
                }
                return [];
            });
    }

    put(url: string, body: Object): Observable<any> {
        const me = this;
        return this.http.put(this.appConfig.baseApiPath + url, JSON.stringify(body), { headers: this.getHeaders() })
            .catch(function (error: any) {
                if (error.status === 401) {
                    // me.router.navigate(['/login']);
                    me.notifyService.notifyUser('user.unauthorized');
                }
                return [];
            });
    }

    delete(url: string): Observable<any> {
        const me = this;
        return this.http.delete(this.appConfig.baseApiPath + url, { headers: this.getHeaders() })
            .catch(function (error: any) {
                if (error.status === 401) {
                    // me.router.navigate(['/login']);
                    me.notifyService.notifyUser('user.unauthorized');
                }
                return [];
            });
    }

    postFormData(url: string, formData: FormData): Observable<any> {
        const me = this;
        let headers = new HttpHeaders();
        const token = this.userInfoService.getStoredToken();
        if (token !== null) {
            headers = headers.append('Authorization', 'Bearer ' + token);
        }
        return this.http.post(this.appConfig.baseApiPath + url, formData, { headers: headers })
            .catch(function (error: any) {
                if (error.status === 401) {
                    // me.router.navigate(['/login']);
                    me.notifyService.notifyUser('user.unauthorized');
                }
                return [];
            });
    }

}
