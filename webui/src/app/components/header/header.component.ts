import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { LoginService } from '../../services/api/login.service';
import { UserInfoService } from '../../services/user-info.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
    selector: 'a-app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent implements OnInit {
    userList: any[];
    langList: any[];
    currentUser: any;
    userid: number;
    userImage: string;
    langImage: string;
    fullName: string;
    constructor(
        private sidebarService: NbSidebarService,
        private menuService: NbMenuService,
        private loginService: LoginService,
        private userInfoService: UserInfoService,
        private route: Router
    ) { }

    ngOnInit() {
        const user = this.userInfoService.getUserInfo();
        this.userid = user !== null ? user.id : 0;
        const profileLink = (this.userid > 0) ? '/home/profile/' + this.userid : 'home/dashboard';
        this.userList = (this.userid > 0) ? [
            {
                title: 'تحديث بياناتى',
                link: profileLink
            },
            {
                title: 'تسجيل الخروج',
                link: '../logout'
            }
        ] : [];
        this.userImage = (this.userid > 0) ? user.image : '';
        this.fullName = (this.userid > 0) ? user.userName : '';
        this.initializeLanguagesMenu();
    }
    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, 'menu-sidebar');
        return false;
    }

    toggleSettings(): boolean {
        this.sidebarService.toggle(false, 'settings-sidebar');
        return false;
    }

    goToHome() {
        this.menuService.navigateHome();
    }

    logout() {
        this.route.navigate(['logout']);
    }

    initializeLanguagesMenu() {
        this.langImage = '../../../assets/images/translate.png';
        this.langList = [
            {'title': 'English', 'link': 'change-locale/en'},
            {'title': 'Espanol', 'link': 'change-locale/es'},
        ];
    }


}
