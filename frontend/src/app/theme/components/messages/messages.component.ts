import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { MessagesService } from './messages.service';
import { NotificationsService } from '../../../shared/services/notifications.service';
import { MailboxService } from '../../../pages/mailbox/mailbox.service';
import { Mail } from '../../../pages/mailbox/mail.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessagesService, NotificationsService]
})
export class MessagesComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public selectedTab = 1;
  public messages: Array<Object>;
  public mailbox: Mail[];
  constructor(
    private messagesService: MessagesService,
    private notificationsService: NotificationsService,
    private mailboxService: MailboxService
  ) {
    this.getNotifications();
    this.getEmails();
  }

  ngOnInit() {
  }

  getNotifications() {
    this.notificationsService.getUserNotifications().subscribe(response => {
      this.messages = response;
      // console.log(this.messages);
    });
  }

  getEmails() {
    this.mailboxService.getUserInbox().subscribe(response => {
      // console.log(response.mailboxes);
      this.mailbox = response.mailboxes;
    });
  }

  openMessagesMenu() {
    this.trigger.openMenu();
    this.getNotifications();
    this.getEmails();
    this.selectedTab = 0;
  }

  onMouseLeave() {
    this.trigger.closeMenu();
  }

  stopClickPropagate(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

}
