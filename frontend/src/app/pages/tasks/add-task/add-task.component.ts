import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../users/user.model';
import {UsersService} from '../../users/users.service';
import {TasksService} from '../tasks.service';
import {NotifyUserService} from '../../../shared/services/notify-user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PermissionsModel, UserPermissions} from "../user-permissions.model";

@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

    public form: FormGroup;
    public users: User[];
    public working = false;
    public attachment: string;
    @ViewChild('fileInput') fileInput;
    public project_id: string;
    public usersPermissions: UserPermissions[] = [];

    constructor(
        public fb: FormBuilder,
        public usersService: UsersService,
        public tasksService: TasksService,
        public notifyService: NotifyUserService,
        public router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        this.project_id = this.activatedRoute.snapshot.paramMap.get('projectId');
        this.form = this.fb.group({
            id: null,
            title: [null, Validators.compose([Validators.required])],
            start_date: [null, Validators.compose([Validators.required])],
            end_date: [null, Validators.compose([Validators.required])],
            description: [null, Validators.compose([Validators.required])],
            priority: [1],
            // user_id: [null, Validators.compose([Validators.required])],
            attachment: null,
            project_id: null,
            permissions: [[]]
        });
    }

    ngOnInit() {
        this.getAllUsers();
        const me = this;
    }

    onSaveTask() {
        const me = this;

        if (me.form.controls['start_date'].value > me.form.controls['end_date'].value) {
            me.notifyService.notifyUser('tasks.start-end-date-error');
        } else {
            me.working = true;
            me.form.controls['project_id'].setValue(me.project_id);
            me.form.controls['permissions'].setValue(me.usersPermissions);
            this.tasksService.addTask(this.form.value)
                .subscribe((response) => {
                    if (response.success === true) {
                        // console.log(response.message);
                        this.notifyService.notifyUser('general.messages.saved');
                        this.router.navigate(['tasks/view-tasks/', me.project_id]);
                    } else {
                        this.notifyService.prepareResponse(response, response.message);
                    }
                    me.working = false;
                });
        }

    }

    /**
     * Get users for dropdown menu
     */
    getAllUsers(): void {
        this.usersService.getUsersByProjectId(this.project_id).subscribe((response) => {
            if (response.success === true) {
                this.users = response.data;
                this.createUserPermissionsObject(response.data);
            }
        });
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

    createUserPermissionsObject(users: User[]) {
        users.forEach(user => {
            const userPermission = new UserPermissions();
            userPermission.user_id = user.id;
            userPermission.username = user.first_name + ' ' + user.last_name;
            userPermission.permissions = new PermissionsModel();
            this.usersPermissions.push(userPermission);
        });
    }
}
