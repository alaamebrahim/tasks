import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from '../../../services/api/login.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {SnotifyService} from 'ng-snotify';
import {UsersService} from '../../../services/api/users.service';
import { LocaleService } from '../../../services/api/locale.service';

@Component({
    selector: 'app-register-social-user',
    templateUrl: './register-social-user.component.html',
    styleUrls: ['./register-social-user.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class RegisterSocialUserComponent implements OnInit {

    user: any;
    registered = false;

    constructor(private loginService: LoginService,
                private translator: LocaleService,
                private router: Router,
                private notify: SnotifyService,
                private usersService: UsersService) {
    }

    ngOnInit() {
        if (this.loginService.socialUserData === undefined) {
            this.router.navigate(['login']);
            return;
        }
        this.user = this.loginService.socialUserData;
        if (this.user === undefined) {
            this.router.navigate(['login']);
        }
    }

    submitForm() {
        let me = this;
        this.usersService.saveUserData(this.user)
            .subscribe(response => {
                if (response && response !== 'undefined') {
                    if (response.success !== true) {
                        // I must add something here when error occur
                        this.notify.error('Data not saved!');
                        console.log(response);
                        return;
                    }
                    me.registered = true;

                }
            }, error => {
                console.log(error);
                this.notify.error(error);
            });
    }

}
