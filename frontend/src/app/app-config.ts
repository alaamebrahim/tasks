import {Injectable} from '@angular/core';
import { UserInfoService } from './shared/services/user-info.service';
import {environment} from '../environments/environment';
import { LocaleService } from './shared/services/locale.service';
import { TranslateService } from '@ngx-translate/core';
/**
 * This is a singleton class
 */
@Injectable()
export class AppConfig {
    // Provide all the Application Configs here

    public locale = 'ar';

    // API Related configs
    public baseApiPath: string;

    constructor(
        private userInfoService: UserInfoService,
        private localeService: LocaleService,
        private translator: TranslateService
    ) {}

    load() {
        this.baseApiPath = environment.apiUrl;
        const locale = sessionStorage.getItem('locale');
        if (locale !== 'undefined' && locale !== null) {
            this.changeLocale(locale);
            this.setLocale();
        } else {
            sessionStorage.setItem('locale', 'ar');
            this.changeLocale('ar');
            this.setLocale();
        }
    }

    changeLocale(locale: string) {
        sessionStorage.setItem('locale', locale);
        this.locale = locale;
    }

    setLocale() {
        console.log(sessionStorage.getItem('locale'));
        this.translator.setDefaultLang(sessionStorage.getItem('locale'));
        this.translator.use(sessionStorage.getItem('locale'));
    }
}
