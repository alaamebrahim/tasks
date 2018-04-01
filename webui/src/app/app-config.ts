import {Injectable} from '@angular/core';
import { AuthServiceConfig, SocialLoginModule, FacebookLoginProvider, } from 'angular5-social-login';
import { UserInfoService } from './services/user-info.service';
import {environment} from '../environments/environment';
/**
 * This is a singleton class
 */
@Injectable()
export class AppConfig {
    // Provide all the Application Configs here

    public version = '1.0.0';
    public locale = 'en-US';
    public currencyFormat = {style: 'currency', currency: 'USD'};
    public dateFormat = {year: 'numeric', month: 'short', day: 'numeric'};
    public homePage = 'home/dashboard';
    public filesDir = '../assets/audio/';

    // API Related configs
    public apiPort = '9119';
    public apiProtocol: string;
    public apiHostName: string;
    public baseApiPath: string;

    constructor(private userInfoService: UserInfoService) {}

    load() {
        /*if (this.apiProtocol === undefined) {
            this.apiProtocol = window.location.protocol;
        }
        if (this.apiHostName === undefined) {
            this.apiHostName = window.location.hostname;
        }
        if (this.apiPort === undefined) {
            this.apiPort = window.location.port;
        }
        if (this.apiHostName.includes('infomud') || this.apiHostName.includes('heroku')) {
            this.baseApiPath = this.apiProtocol + '//' + this.apiHostName + '/';
        } else {
            this.baseApiPath = this.apiProtocol + '//' + this.apiHostName + ':' + this.apiPort + '/';
        }*/
        this.baseApiPath = environment.apiUrl;
        const locale = sessionStorage.getItem('locale');
        if (locale !== 'undefined' && locale !== null) {
            this.changeLocale(locale);
        } else {
            this.changeLocale('ar');
        }
    }

    changeLocale(locale: string) {
        sessionStorage.setItem('locale', locale);
        this.locale = locale;
    }
}
/*
// Facebook Login config
export function getAuthServiceConfigs() {
    const config = new AuthServiceConfig(
        [
            {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider('165267844279407')
            }
        ]
    );
    return config;
}*/
