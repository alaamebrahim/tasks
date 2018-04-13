import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Task } from '../task.model';
import { NotifyUserService } from '../../../shared/services/notify-user.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../../../share/services/notifications.service';
import { Notification } from './notification.model';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss']
})
export class AddNotificationComponent implements OnInit {
  private form: FormGroup;
  private saved = false;

  constructor(
    private dialogRef: MatDialogRef<AddNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) private notification: Notification,
    private fb: FormBuilder,
    private notifyService: NotifyUserService,
    private notificationsService: NotificationsService
  ) {
    this.form = this.fb.group({
      id: null,
      user_id: null,
      task_id: null,
      text: null,
    });
  }

  ngOnInit() {
    // console.log(this.notification);
    this.form.setValue(this.notification);
  }

  onSaveNotificatiion() {
    // console.log(this.form.value);
    this.notificationsService.sendSingleNotification(this.form.value)
      .subscribe(response => {
        if (response.success === true) {
          this.saved = true;
          this.notifyService.notifyUser('general.messages.saved');
        } else {
          this.notifyService.notifyUser('general.messages.error');
        }
      });
  }

}
