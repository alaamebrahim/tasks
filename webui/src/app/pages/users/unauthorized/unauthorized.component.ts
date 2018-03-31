import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'angular5-social-login';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../../../services/api/login.service';
import { LocaleService } from '../../../services/api/locale.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class UnauthorizedComponent implements OnInit {

  constructor(private translator: LocaleService) { }

  ngOnInit() {
  }

}
