import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Task } from '../task.model';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-show-attachment',
  templateUrl: './show-attachment.component.html',
  styleUrls: ['./show-attachment.component.scss']
})
export class ShowAttachmentComponent implements OnInit {
  attachmentPath = environment.attachmentsPath;
  attachmentImage: string;
  constructor(
    private dialogRef: MatDialogRef<ShowAttachmentComponent>,
    @Inject(MAT_DIALOG_DATA) private task: Task,
  ) { }

  ngOnInit() {
    this.attachmentImage = this.attachmentPath + this.task.attachment;
  }

}
