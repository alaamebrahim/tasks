import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {User} from '../../users/user.model';
import {UsersService} from '../../users/users.service';
import {TasksService} from '../tasks.service';
import {Task} from '../task.model';
import {NotifyUserService} from '../../../shared/services/notify-user.service';
import {Router} from '@angular/router';
import {UserPermissions} from "../user-permissions.model";

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'edit-add-task',
    templateUrl: './edit-task.component.html',
    styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

    public form: FormGroup;
    public users: User[];
    public saved = false;
    public usersPermissions: UserPermissions[] = [];
    @ViewChild('fileInput') fileInput;
    public attachment: string;
    public working = false;


    constructor(
        private dialogRef: MatDialogRef<EditTaskComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private fb: FormBuilder,
        private usersService: UsersService,
        private tasksService: TasksService,
        private notifyService: NotifyUserService,
        private router: Router,
    ) {
        this.form = this.fb.group({
            id: null,
            title: [null, Validators.compose([Validators.required])],
            start_date: [null, Validators.compose([Validators.required])],
            end_date: [null, Validators.compose([Validators.required])],
            description: [null, Validators.compose([Validators.required])],
            priority: [1],
            user_id: [null, Validators.compose([Validators.required])],
            cancelled: null,
            created_at: null,
            updated_at: null,
            first_name: null, // This will be removed on save
            last_name: null, // this will be removed on save
            progress: null, // thi will be removed on save
            completed: null, // thi will be removed on save
            notifications: null, // thi will be removed on save
            attachment: null,
            project_id: null,
            permissions: [[]]
        });
    }

    ngOnInit() {
        this.createUserPermissionsObject(JSON.parse(this.data[0].task.permissions));
        this.form.setValue(this.data[0].task);
    }

    prepareUserId() {
        const user_ids: any[] = [];
        user_ids.push(this.data[0].task['user_id']);
        this.data[0].task['user_id'] = user_ids;
    }

    onSaveTask() {
        const me = this;
        if (me.form.controls['start_date'].value > me.form.controls['end_date'].value) {
            me.notifyService.notifyUser('tasks.start-end-date-error')
        } else {
            me.form.controls['permissions'].setValue(me.usersPermissions);
            this.tasksService.updateTask(this.form.value)
                .subscribe((response) => {
                    if (response.success === true) {
                        this.saved = true;
                        // console.log(response.message);
                        this.notifyService.notifyUser('general.messages.saved');
                        this.router.navigate(['tasks/view-tasks/', this.form.controls['project_id'].value]);
                    } else {
                        this.notifyService.notifyUser('general.messages.error');
                    }
                });
        }

    }

    /**
     * Get users for dropdown menu
     */
    // getAllUsers(): void {
    //     this.usersService.getUsersByProjectId(this.data.projectId).subscribe((response) => {
    //         if (response.success === true) {
    //             this.users = response.data;
    //             this.createUserPermissionsObject(JSON.parse(response.data[0].permissions));
    //         }
    //     });
    // }

    private createUserPermissionsObject(data: UserPermissions[]) {
        this.usersPermissions = data;
    }


    addFile(): void {
        this.working = true;
        const fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            const fileToUpload = fi.files[0];
            // this.form.controls['picture'].setValue(fileToUpload);
            // console.log(fileToUpload);
            this.usersService.uploadTaskAttachment(fileToUpload).subscribe(response => {
                if (response.success === true) {
                    this.form.controls['attachment'].setValue(response.message);
                    // console.log(this.form.value);
                    this.attachment = response.message;
                }
                this.working = false;
            });
        } else {
            this.working = false;
        }

    }
}
