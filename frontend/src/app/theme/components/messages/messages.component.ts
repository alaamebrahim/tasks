import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { MessagesService } from './messages.service';
import { NotificationsService } from '../../../shared/services/notifications.service';

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
  public files: Array<Object>;
  public meetings: Array<Object>;
  constructor(
    private messagesService: MessagesService,
    private notificationsService: NotificationsService
  ) {
    this.files = messagesService.getFiles();
    this.meetings = messagesService.getMeetings();
    this.getNotifications();
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
