import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { TranslateService } from '@ngx-translate/core';
import { LocaleService } from '../../shared/services/locale.service';
import { LoginService } from '../../shared/services/login.service';
import { Role } from './role.model';
import { UserInfoService } from '../../shared/services/user-info.service';
import { NotifyUserService } from '../../shared/services/notify-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public form: FormGroup;
  public settings: Settings;
  constructor(
    public appSettings: AppSettings,
    public fb: FormBuilder,
    public router: Router,
    private translator: TranslateService,
    private notifyService: NotifyUserService,
    private loginService: LoginService,
    private userInfoService: UserInfoService
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

  public onSubmit(): void {
    if (this.form.valid) {
      this.loginService.getToken(this.form.get('email').value, this.form.get('password').value)
        .then(resp => {
          // console.log(resp);
          if (resp === undefined) {
            this.notifyService.notifyUser('login.messages.badcredits');
            return;
          }
          if (resp.login === 'token_generated') {
            sessionStorage.setItem('userToken', resp.data.token);
            // console.log('Yes, token is generated');
            this.loginService.getUserDataByToken(resp.data.token)
              .then(userResp => {
                // console.log(userResp);
                this.loginService.getUserRoleName(userResp.data.role_id, resp.data.token)
                  .subscribe(roleResp => {
                    // console.log(roleResp);
                    const role: Role = roleResp;
                    this.loginService.saveUserDataInSession(userResp, resp.data.token, role.name);
                    this.router.navigate(['/']);
                  });
              }, error => {
                this.notifyService.notifyUser('login.messages.error');
                console.log(error);
              });
          } else {
            this.notifyService.notifyUser('login.messages.badcredits');
          }
        }, errResponse => {
          this.notifyService.notifyUser('login.messages.error');
          console.log(errResponse);
        });
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }
}
