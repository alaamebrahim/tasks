import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LocaleService } from '../../services/api/locale.service';
import {
  AuthService,
  FacebookLoginProvider,
} from 'angular5-social-login';
import { Router } from '@angular/router';
import { LoginService } from '../../services/api/login.service';
import { SnotifyService } from 'ng-snotify';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LandingPageComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService,
    private translator: LocaleService,
    private socialAuthService: AuthService,
    private notify: SnotifyService
  ) { }

  ngOnInit() {
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
            // console.log(socialPlatform + ' sign in data : ', userData);
            // Now sign-in with userData
            return this.loginService.performLogin(userData);
        }
    );
}

}
