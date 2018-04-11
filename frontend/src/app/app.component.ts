import { Component, ViewChild} from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { LocaleService } from './shared/services/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { AppConfig } from './app-config';
import { UsersService } from './pages/users/users.service';
import { ApiRequestService } from './shared/services/api-request.service';
import { UserInfoService } from './shared/services/user-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public settings: Settings;
  constructor(
    public appSettings: AppSettings,
    private translator: TranslateService,
    private localeService: LocaleService,
    private permissionsService: NgxPermissionsService,
    private userInfoService: UserInfoService,
    appConfig: AppConfig
  ) {
      this.settings = this.appSettings.settings;
      this.translator.setDefaultLang(sessionStorage.getItem('locale'));
      this.translator.use(sessionStorage.getItem('locale'));
      const perm = this.userInfoService.getUserInfo().role;
      // console.log(perm);
      this.permissionsService.loadPermissions([perm]);
  }

  // ngOnInit() { }
}
