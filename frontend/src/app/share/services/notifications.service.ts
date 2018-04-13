import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../shared/services/api-request.service';
import { Notification } from '../../pages/tasks/add-notification/notification.model';

@Injectable()
export class NotificationsService {

  constructor(
    private apiRequestService: ApiRequestService
  ) { }

  sendSingleNotification (notification: Notification) {
    return this.apiRequestService.post('notifications/send-notification', notification);
  }

}
