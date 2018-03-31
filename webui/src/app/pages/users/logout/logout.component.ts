import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserInfoService, LoginInfoInStorage} from '../../../services/user-info.service';
import { LocaleService } from '../../../services/api/locale.service';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.scss'],
})

export class LogoutComponent {
    constructor(private userInfoService: UserInfoService, private translator: LocaleService) {
        this.userInfoService.removeUserInfo();
    }
}
