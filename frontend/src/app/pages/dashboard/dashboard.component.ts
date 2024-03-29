import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { LocaleService } from '../../shared/services/locale.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public settings: Settings;
  constructor(
    public appSettings: AppSettings,
    private translator: TranslateService,
    private localeService: LocaleService
  ) {
    this.settings = this.appSettings.settings;
    this.translator.setDefaultLang(sessionStorage.getItem('locale'));
    this.translator.use(sessionStorage.getItem('locale'));
  }

  ngOnInit() {
  }

}
