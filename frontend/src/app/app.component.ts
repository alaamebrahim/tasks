import { Component, ViewChild} from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { LocaleService } from './shared/services/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from './app-config';
import { PermissionsService } from './shared/services/permissions.service';

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
    private permissionsService: PermissionsService,
    appConfig: AppConfig
  ) {
      this.settings = this.appSettings.settings;
      this.translator.setDefaultLang(sessionStorage.getItem('locale'));
      this.translator.use(sessionStorage.getItem('locale'));
      this.permissionsService.setUserPermissions();
  }

  // ngOnInit() { }
}
