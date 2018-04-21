import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../../shared/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  public notifications: Notification;
  constructor(
    private notificationsService: NotificationsService,
  ) { }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    this.notificationsService.getUserNotifications().subscribe(response => {
      this.notifications = response;
      // console.log(this.messages);
    });
  }

}
