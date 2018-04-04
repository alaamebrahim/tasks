import {Injectable, Inject} from '@angular/core';
import {AppConfig} from '../../app-config';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class LocaleService {
    constructor(private translator: TranslateService) {
        // Code to get Locale Info from Session Storage
        this.translator.setDefaultLang(sessionStorage.getItem('locale'));
        this.translator.use(sessionStorage.getItem('locale'));
    }

    setLocale() {
        console.log(sessionStorage.getItem('locale'));
        this.translator.setDefaultLang(sessionStorage.getItem('locale'));
        this.translator.use(sessionStorage.getItem('locale'));
    }

    translate(key: string): string {
        let translatedPhrase = '';
        this.translator.get(key).subscribe((res: string) => {
            translatedPhrase = res;
        });
        return translatedPhrase;
    }
}
