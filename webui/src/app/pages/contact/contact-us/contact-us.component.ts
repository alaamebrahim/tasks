import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LocaleService } from '../../../services/api/locale.service';
import { ApiRequestService } from '../../../services/api/api-request.service';
export class MailSend {
  fullName: string;
  email: string;
  subject: string;
}
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContactUsComponent implements OnInit {
  user = new MailSend();
  sent = false;
  success = false;
  constructor(
    private localeService: LocaleService,
    private apiRequest: ApiRequestService
  ) { }

  ngOnInit() {
  }

  sendMail() {
    console.log(this.user);
    const me = this;
    me.apiRequest.post('api/contact-us/send-mail', me.user).subscribe((res) => {
      console.log(res);
      me.sent = true;
      if (res.operationStatus === 'SUCCESS') {
        me.success = true;
      }
    });
  }

}
