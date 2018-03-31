import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsersService } from '../../../services/api/users.service';
import { UserInfoService } from '../../../services/user-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SnotifyService } from 'ng-snotify';
import { AppConfig } from '../../../app-config';
import { LocaleService } from '../../../services/api/locale.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProfileComponent implements OnInit {

  user: any;
  userid: number;
  constructor(
    private userInfoService: UserInfoService,
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private translator: LocaleService,
    private notify: SnotifyService,
    private config: AppConfig
  ) {}

  ngOnInit() {
    this.user = this.route.snapshot.data.any;
    if (this.user === null) {
      this.router.navigate([this.config.homePage]);
    }
  }

  submitForm() {
    this.usersService.updateProfile(this.user)
    .then(resp => {
        if (resp && resp.operationStatus === 'SUCCESS') {
            this.notify.info(this.translator.translate('user.success.profile-updated'));
            this.router.navigate([this.config.homePage]);
        } else {
          this.notify.info(this.translator.translate('user.errors.profile-update-error'));
        }
    });
  }

}
