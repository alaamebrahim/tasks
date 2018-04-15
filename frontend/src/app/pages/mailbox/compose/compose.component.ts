import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MailboxService } from '../mailbox.service';
import { ComposedMail } from './composed-mail.model';
import { User } from '../../users/user.model';
import { UsersService } from '../../users/users.service';
import { NotifyUserService } from '../../../shared/services/notify-user.service';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {
  public settings: Settings;
  public form: FormGroup;
  private users: User[];
  private sending = false;

  constructor(
    public appSettings: AppSettings,
    public formBuilder: FormBuilder,
    private mailboxService: MailboxService,
    private usersService: UsersService,
    private notifyService: NotifyUserService
  ) { this.settings = this.appSettings.settings; }

  ngOnInit() {
    this.getAllUsers();
    this.setForm();
  }

  setForm() {
    this.form = this.formBuilder.group({
      'receiver_id': ['', Validators.required],
      'subject': [null, Validators.required],
      'message': [null, Validators.required],
      'sender_id': this.mailboxService.getSenderId(),
      'attachment': null,
      'readed': false,
      'starred': false,
      'draft': false,
      'trash': false
    });
  }

  public onSubmit() {
    this.sending = true;
    if (this.form.valid) {
      this.mailboxService.sendMail(this.form.value).subscribe(response => {
        if (response.success === true) {
          this.sending = false;
          this.setForm();
          // this.form.reset();
          this.notifyService.notifyUser('general.messages.sent');
        } else {
          this.sending = false;
          this.notifyService.notifyUser(response.message);
        }
      }, error => this.notifyService.notifyUser('general.messages.error'));
    }
  }

  /**
   * Get users for dropdown menu
   */
  getAllUsers(): void {
    this.usersService.getUsers().subscribe((response) => {
      // console.log(response);
      this.users = response['users'];
    });
  }

}
