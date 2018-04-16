import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { Mail } from './mail.model';
import { MailboxService } from './mailbox.service';
import { environment } from '../../../environments/environment';
import { NotifyUserService } from '../../shared/services/notify-user.service';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.scss'],
  providers: [MailboxService]
})
export class MailboxComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public settings: Settings;
  public sidenavOpen = true;
  public mails: Array<Mail>;
  public mail: Mail;
  public newMail: boolean;
  public type = 'all';
  public searchText: string;
  private userPic = environment.userPicPath;

  constructor(public appSettings: AppSettings,
    private notifyService: NotifyUserService,
    private mailboxService: MailboxService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.getMails();
    if (window.innerWidth <= 992) {
      this.sidenavOpen = false;
    }
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth <= 992) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  public getMails() {
    this.newMail = false;
    switch (this.type) {
      case 'all':
        this.mailboxService.getUserInbox().subscribe(response => {
          // console.log(response.mailboxes);
          this.mails = response.mailboxes;
        });
        break;
      case 'starred':
        this.mailboxService.getStarredMails().subscribe(response => {
          // console.log(response);
          this.mails = response.mailboxes;
        });
        break;
      case 'sent':
        this.mailboxService.getSentMails().subscribe(response => {
          // console.log(response);
          this.mails = response.mailboxes;
          // console.log(this.mails);
        });
        break;
      case 'trash':
        this.mailboxService.getTrashMails().subscribe(response => {
          // console.log(response.mailboxes);
          this.mails = response.mailboxes;
        });
        break;
      default:
      // this.mails = this.mailboxService.getDraftMails();
    }
  }

  /**
   * Show selected mail
   * @param mail
   */
  public viewDetail(mail: Mail) {
    this.newMail = false;
    this.mail = mail;
    this.setAsRead();
    if (window.innerWidth <= 992) {
      this.sidenav.close();
    }
  }

  /**
   * View new mail form
   */
  public compose() {
    this.mail = null;
    this.newMail = true;
  }

  /**
   * Set mail as readed
   */
  public setAsRead() {
    this.mail.readed = true;
    this.mailboxService.updateReadStatus(this.mail).subscribe(response => {
      this.notifyService.prepareResponse(response, null);
    });
  }

  /**
   * Set mail as unreaded
   */
  public setAsUnRead() {
    this.mail.readed = false;
    this.mailboxService.updateReadStatus(this.mail).subscribe(response => {
      this.notifyService.prepareResponse(response, null);
    });
  }

  public delete() {
    this.mail.trash = true;
    // this.mail.sent = false;
    this.mail.draft = false;
    this.mail.starred = false;
    this.getMails();
    this.mail = null;
  }

  /**
   * Change starred status
   */
  public changeStarStatus() {
    this.mail.starred = !this.mail.starred;
    this.mailboxService.updateStarStatus(this.mail).subscribe(response => {
      this.notifyService.prepareResponse(response, null);
    });
  }

  public moveToTrash() {
    this.mail.trash = true;
    this.mailboxService.moveToTrash(this.mail).subscribe(response => {
      this.notifyService.prepareResponse(response, null);
      this.type = 'all';
      this.getMails();
    });
  }


  public restore() {
    this.mail.trash = false;
    this.mailboxService.moveToTrash(this.mail).subscribe(response => {
      this.notifyService.prepareResponse(response, null);
      this.type = 'trash';
      this.getMails();
    });
  }

}
