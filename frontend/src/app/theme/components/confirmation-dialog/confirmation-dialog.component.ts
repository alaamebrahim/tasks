import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Confirm } from './confirm.model';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

    @Output() accepted = new EventEmitter<boolean>();

    constructor(
        private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public confirm: Confirm, ) { }

    ngOnInit() {
    }

    /** Accept action */
    onAcceptAction() {
        this.accepted.emit(true);
    }

    /** Deny action */
    onDenyAction() {
        this.accepted.emit(false);
    }

}
