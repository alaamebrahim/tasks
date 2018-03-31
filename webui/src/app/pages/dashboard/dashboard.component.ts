import {Component, OnInit} from '@angular/core';
import { AppConfig } from '../../app-config';
import { LocaleService } from '../../services/api/locale.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard-pg',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.scss'],
})

export class DashboardComponent {
    constructor(
        private appConfig: AppConfig,
        private translateService: LocaleService,
        private router: Router,
    ) {
    }

    navigateUserTo(destination: string) {
        if (destination !== null) {
            switch (destination) {
                case 'verses':
                    this.router.navigate(['home/verses']);
                    break;
                case 'pray':
                    this.router.navigate(['home/how-to-pray']);
                    break;
                case 'prayer':
                    this.router.navigate(['home/prayer-times']);
                    break;
                case 'contact':
                    this.router.navigate(['home/contact-us']);
                    break;
                case 'qibla':
                    this.router.navigate(['home/find-qibla']);
                    break;
                default:
                    this.router.navigate(['home/dashboard']);
            }
        }
    }
}
