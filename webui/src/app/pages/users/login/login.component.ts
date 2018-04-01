import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../../services/api/login.service';
import { Router } from '@angular/router';
// import {AuthService} from 'angular2-social-login';
/*import {
    AuthService,
    FacebookLoginProvider,
} from 'angular5-social-login';*/
import { TranslateService } from '@ngx-translate/core';
import { Snotify, SnotifyService } from 'ng-snotify';
import { LocaleService } from '../../../services/api/locale.service';
import { NbSpinnerService } from '@nebular/theme';
import { LoginInfoInStorage } from '../../../services/user-info.service';

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
        // private socialAuthService: AuthService,
        private notify: SnotifyService) { }

    ngOnInit() {
        // reset login status
        this.loginService.logout(false);
    }


    /*public socialSignIn(socialPlatform: string) {
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
    }*/

    login() {
        this.loginService.getToken(this.model.email, this.model.password)
            .then(resp => {
                // console.log(resp);
                if (resp.login === 'token_generated') {
                    // console.log('Yes, token is generated');
                    this.loginService.getUserDataByToken(resp.data.token)
                        .then(userResp => {
                            // console.log(userResp);
                            this.loginService.getUserRoleName(userResp.data.role_id, resp.data.token)
                                .subscribe(roleResp => {
                                    // console.log(roleResp.json().name);
                                    this.loginService.saveUserDataInSession(userResp, resp.data.token, roleResp.json().name);
                                    this.router.navigate(['home/dashboard']);
                                });
                        }, error => console.log(error));
                    // this.router.navigate(['home/dashboard']);
                } else {

                }
            }, errResponse => errResponse);
    }

    onSignUp() {
        this.router.navigate(['signup']);
    }


}
