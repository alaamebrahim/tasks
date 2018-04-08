import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { LoginService } from './services/api/login.service';
import { UserInfoService } from './services/user-info.service';
/*
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';*/
import { transition, trigger, query, style, animate, group, animateChild, stagger, keyframes } from '@angular/animations';

@Component({
    selector: 'home-comp',
    templateUrl: './home.component.html',
    styleUrls: ['./home.scss'],
    animations: [
        trigger('animRoutes', [
            transition('* => *', [
                query(':enter', style({ opacity: 0 }), { optional: true }),
                query(':enter', stagger('300ms', [
                    animate('.6s ease-in', keyframes([
                        style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
                        style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
                        style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
                    ]))]), { optional: true })
            ])
        ])
    ],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent {

    public showAppAlert = false;
    public appHeaderItems = [
        { label: 'الرئيسية', href: '/home', subNav: [] },
        { label: 'المستخدمبن', href: '/home/users' }
    ];

    public menuItems = [
        { title: 'الرئيسية', link: '/home', icon: 'nb-home', },
    ];

    public userName = '';

    constructor(private router: Router,
        private activeRoute: ActivatedRoute,
        private loginService: LoginService,
        private userInfoService: UserInfoService) {
        // console.log(val);
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
        if (this.userInfoService.getUserInfo().role === 'admin' || this.userInfoService.getUserInfo().role === 'root') {
            const users = {
                title: 'المستخدمين',
                link: '/home/users',
                icon: 'nb-keypad',
            };
            this.menuItems.push(users);
        }
        const contactUs = {
            title: 'الاتصال بنا',
            link: '/home/contact-us',
            icon: 'nb-email',
        };
        this.menuItems.push(contactUs);
    }

    closeAppAlert() {
        this.showAppAlert = false;
    }

    getPage(outlet) {
        return outlet.activatedRouteData;
    }

}
