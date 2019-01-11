import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {emailValidator} from '../../theme/utils/app-validators';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {TranslateService} from '@ngx-translate/core';
import {LoginService} from '../../shared/services/login.service';
import {UserInfoService} from '../../shared/services/user-info.service';
import {NotifyUserService} from '../../shared/services/notify-user.service';

@Component({
    selector: 'app-login',
    styleUrls: ['login.component.scss'],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    public form: FormGroup;
    public settings: Settings;
    public loading = false;

    constructor(
        public appSettings: AppSettings,
        public fb: FormBuilder,
        public router: Router,
        private translator: TranslateService,
        private notifyService: NotifyUserService,
        private loginService: LoginService,
        private userInfoService: UserInfoService,
    ) {
        this.settings = this.appSettings.settings;
        this.translator.setDefaultLang(sessionStorage.getItem('locale'));
        this.translator.use(sessionStorage.getItem('locale'));
        this.form = this.fb.group({
            'email': [null, Validators.compose([Validators.required, emailValidator])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
        });
        // as long as you choosed this page, then u MUST login again.
        this.userInfoService.removeUserInfo();
    }

    async onSubmit() {
        const me = this;
        me.loading = true;
        if (me.form.valid) {
            await me.loginService.getToken(me.form.get('email').value, me.form.get('password').value)
                .then(resp => {
                    // console.log(resp);
                    if (resp === undefined) {
                        me.notifyService.notifyUser('login.messages.badcredits');
                        return;
                    }
                    if (resp.login === 'token_generated') {
                        sessionStorage.setItem('userToken', resp.data.token);
                        // console.log('Yes, token is generated');
                        me.loginService.getUserDataByToken(resp.data.token)
                            .then(userResp => {
                                // console.log(userResp.data.is_blocked);
                                // Check if this user is activated and not blocked
                                if (userResp.data.is_blocked === 1 || userResp.data.is_active !== 1) {
                                    sessionStorage.clear();
                                    me.notifyService.notifyUser('login.messages.blocked');
                                    me.loading = false;
                                    return;
                                }
                                // Finally save user data
                                me.loginService.saveUserDataInSession(userResp, resp.data.token);
                            }, error => {
                                me.loading = false;
                                me.notifyService.notifyUser('login.messages.error');
                                console.log(error);
                            });
                    } else {
                        me.loading = false;
                        me.notifyService.notifyUser('login.messages.badcredits');
                    }
                }, errResponse => {
                    me.notifyService.notifyUser('login.messages.error');
                    console.log(errResponse);
                });
            me.loading = false;
        }
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        this.settings.loadingSpinner = false;
    }
}
