import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse, HttpRequest, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {UserInfoService, LoginInfoInStorage} from '../user-info.service';
import {AppConfig} from '../../app-config';


@Injectable()
export class ApiRequestService {

    constructor(private appConfig: AppConfig,
                private http: HttpClient,
                private router: Router,
                private userInfoService: UserInfoService) {
    }

    /**
     * This is a Global place to add all the request headers for every REST calls
     */
    getHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        const token = this.userInfoService.getStoredToken();
        headers = headers.append('Content-Type', 'application/json');
        if (token !== null) {
            headers = headers.append('token', token);
        }
        return headers;
    }

    get(url: string, urlParams?: HttpParams): Observable<any> {
        const me = this;
        return this.http.get(this.appConfig.baseApiPath + url, {headers: this.getHeaders(), params: urlParams})
            .catch(function (error: any) {
                console.log('Some error in catch');
                if (error.status === 401 || error.status === 403) {
                    me.router.navigate(['/logout']);
                }
                return Observable.throw(error || 'Server error');
            });
    }

    post(url: string, body: Object): Observable<any> {
        const me = this;
        // console.log(JSON.stringify(body));
        return this.http.post(this.appConfig.baseApiPath + url, JSON.stringify(body), {headers: this.getHeaders()})
            .catch(function (error: any) {
                if (error.status === 401) {
                    me.router.navigate(['/logout']);
                }
                return Observable.throw(error || 'Server error');
            });
    }

    put(url: string, body: Object): Observable<any> {
        const me = this;
        return this.http.put(this.appConfig.baseApiPath + url, JSON.stringify(body), {headers: this.getHeaders()})
            .catch(function (error: any) {
                if (error.status === 401) {
                    me.router.navigate(['/logout']);
                }
                return Observable.throw(error || 'Server error');
            });
    }

    delete(url: string): Observable<any> {
        const me = this;
        return this.http.delete(this.appConfig.baseApiPath + url, {headers: this.getHeaders()})
            .catch(function (error: any) {
                if (error.status === 401) {
                    me.router.navigate(['/logout']);
                }
                return Observable.throw(error || 'Server error');
            });
    }

    postFormData(url: string, formData: FormData): any {
        const oReq = new XMLHttpRequest();
        // Completed succesfully.
        oReq.addEventListener('load', function(evt) {
            console.log(oReq.response);
        });
        // An error happened
        oReq.addEventListener('error', function (evt) {
            console.log(oReq.response);
        });
        // Excecute
        oReq.open('POST', this.appConfig.baseApiPath + url, true);
        const token = this.userInfoService.getStoredToken();
        oReq.setRequestHeader('Content-Type', 'application/json');
        oReq.setRequestHeader('Authorization', token);
        oReq.send(formData);
    }

}
