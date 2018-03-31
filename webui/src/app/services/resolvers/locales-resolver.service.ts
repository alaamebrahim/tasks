import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppConfig } from '../../app-config';
import { LocaleService } from '../api/locale.service';

@Injectable()
export class LocalesResolverService {

  constructor(
    private router: Router,
    private appConfig: AppConfig,
    private localeService: LocaleService
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const locale = route.paramMap.get('locale');
    this.appConfig.changeLocale(locale);
    this.localeService.setLocale();
    this.router.navigate(['home/dashboard']);
  }

}
