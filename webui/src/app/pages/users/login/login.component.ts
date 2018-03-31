import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from '../../../services/api/login.service';
import {Router} from '@angular/router';
// import {AuthService} from 'angular2-social-login';
import {
    AuthService,
    FacebookLoginProvider,
} from 'angular5-social-login';
import {TranslateService} from '@ngx-translate/core';
import { Snotify, SnotifyService } from 'ng-snotify';
import { LocaleService } from '../../../services/api/locale.service';
import { NbSpinnerService } from '@nebular/theme';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.scss'],
})

export class LoginComponent implements OnInit {
    model: any = {};
    errMsg = '';
    // social
    sub: any;
    socialUser: any;

    constructor(
        private router: Router,
        private loginService: LoginService,
        private translator: LocaleService,
        private socialAuthService: AuthService,
        private notify: SnotifyService) {}

    ngOnInit() {
        // reset login status
        this.loginService.logout(false);
    }


    public socialSignIn(socialPlatform: string) {
        let socialPlatformProvider;
        if (socialPlatform === 'facebook') {
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        }

        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                // console.log(socialPlatform + ' sign in data : ', userData);
                // Now sign-in with userData
                return this.loginService.performLogin(userData);
            }
        );
    }

    login() {
        this.loginService.getToken(this.model.email, this.model.password)
            .then(resp => {
                    console.log(resp);
                    if (resp) {
                        if (resp.success !== true) {
                            console.log(resp.message);
                            this.errMsg = resp.message;
                            return;
                        }
                        this.router.navigate(['home/dashboard']);
                        console.log(resp.message);
                    }
                },
                errResponse => {
                    console.log(errResponse);
                    switch (errResponse.status) {
                        case 401:
                            this.errMsg = 'Username or password is incorrect';
                            break;
                        case 404:
                            this.errMsg = 'Service not found';
                            break;
                        case 408:
                            this.errMsg = 'Request Timedout';
                            break;
                        case 500:
                            this.errMsg = 'Internal Server Error';
                            break;
                        default:
                            this.errMsg = 'Server Error';
                    }
                }
            );
    }

    onSignUp() {
        this.router.navigate(['signup']);
    }


}
