import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocaleService } from '../../shared/services/locale.service';

@Injectable()
export class NotifyUserService {

  constructor(
    private notify: MatSnackBar,
    private localeService: LocaleService
  ) { }

  notifyUser(code: string) {
    this.notify.open(this.localeService.translate(code), 'X', { duration: 4000 });
  }

  prepareResponse(response: any, message: string): boolean {
    if (response !== 'undefined' && response !== null) {
      if (response.success === true ) {
        if (message !== null) {
          this.notifyUser(message);
        }
        return true;
      }
      this.notifyUser(response.message);
    }
    return false;
  }

}
