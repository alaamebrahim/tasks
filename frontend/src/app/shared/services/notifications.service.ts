import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../shared/services/api-request.service';
import { Notification } from '../../pages/tasks/add-notification/notification.model';
import { UserInfoService, UserInStorage } from '../../shared/services/user-info.service';

@Injectable()
export class NotificationsService {

  currentUser: UserInStorage;
  constructor(
    private apiRequestService: ApiRequestService,
    private userInfoService: UserInfoService
  ) {
    this.currentUser = this.userInfoService.getUserInfo();
   }

  sendSingleNotification(notification: Notification) {
    return this.apiRequestService.post('notifications/send-notification', notification);
  }

  getUserNotifications() {
    return this.apiRequestService.get('notifications/get-user-notifications/' + this.currentUser.id);
  }

}
