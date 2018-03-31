import {Injectable, Inject} from '@angular/core';
import {AppConfig} from '../../app-config';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class LocaleService {
    constructor(private appConfig: AppConfig, private translator: TranslateService) {
        // Code to get Locale Info from Session Storage
        translator.setDefaultLang(appConfig.locale);
        this.translator.use(appConfig.locale);
    }

    setLocale() {
        this.translator.setDefaultLang(this.appConfig.locale);
        this.translator.use(this.appConfig.locale);
    }

    getDateString(datenum: number): string {
        return new Date(datenum).toLocaleDateString(this.appConfig.locale, this.appConfig.dateFormat);
    }

    getCurrencyString(number: number): string {
        return number.toLocaleString(this.appConfig.locale, this.appConfig.currencyFormat);
    }

    translate(key: string): string {
        let translatedPhrase = '';
        this.translator.get(key).subscribe((res: string) => {
            translatedPhrase = res;
        });
        return translatedPhrase;
    }
}
