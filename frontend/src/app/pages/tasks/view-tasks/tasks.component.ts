import {Component, ViewChild} from '@angular/core';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';
import {DragulaService} from 'ng2-dragula';
import {ActivatedRoute, Router} from '@angular/router';
import {Task} from '../task.model';
import {TasksService} from '../tasks.service';
import {NotifyUserService} from '../../../shared/services/notify-user.service';
import {MatDialog} from '@angular/material';
import {EditTaskComponent} from '../edit-task/edit-task.component';
import {AddNotificationComponent} from '../add-notification/add-notification.component';
import {Notification} from '../add-notification/notification.model';
import {UsersService} from '../../users/users.service';
import {NgxPermissionsService} from 'ngx-permissions';
import {ShowAttachmentComponent} from '../show-attachment/show-attachment.component';
import {UserInfoService} from '../../../shared/services/user-info.service';
import {ProjectsService} from '../../projects/projects.service';
import {Project} from '../../projects/project.model';
import {environment} from '../../../../environments/environment';
import {ConfirmationDialogComponent} from "../../../theme/components/confirmation-dialog/confirmation-dialog.component";
import {Confirm} from "../../../theme/components/confirmation-dialog/confirm.model";
import {UserPermissions} from "../user-permissions.model";

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
    private readonly projectId: string;
    public icons = ['home', 'person', 'alarm', 'work', 'mail', 'favorite'];
    public colors = ['accent', 'primary', 'warn'];
    public settings: Settings;
    public tasks: Task[];
    public project: Project = new Project();
    public users: any[];
    public userIds: number[];
    public page: any;
    public step = 0;
    public searchText: number;
    public taskTitle: string;
    public currentUserRole: string;
    public currentUserId: number;
    public projectImageDir = environment.projectsImagePath;
    /** Detect confirmation dialog action */
    @ViewChild(ConfirmationDialogComponent) confirmationDialogComponent;

    constructor(
        public appSettings: AppSettings,
        private dragula: DragulaService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private tasksService: TasksService,
        private projectService: ProjectsService,
        private notifyService: NotifyUserService,
        private usersService: UsersService,
        private userInfoService: UserInfoService,
        private permissionsService: NgxPermissionsService,
        public dialog: MatDialog,
    ) {
        this.projectId = this.activatedRoute.snapshot.paramMap.get('projectId');
        this.settings = this.appSettings.settings;
        this.currentUserId = this.userInfoService.getUserInfo().id;
        this.currentUserRole = this.userInfoService.getUserInfo().role;
        this.getAllTasks();
        this.getProjectById(this.projectId);
        if (this.permissionsService.getPermissions().user_view !== undefined) {
            this.getUsers();
        }
    }

    async getAllTasks() {
        const me = this;
        me.searchText = 0;
        me.tasks = null;
        await me.tasksService.getTasks(me.projectId).then((data) => {
            // console.log(response);
            me.tasks = data;
        });
    }

    async getProjectById(projectId: any) {
        const me = this;
        await me.projectService.getProjectById(projectId).then(data => {
            if (['root', 'admin'].indexOf(this.currentUserRole) !== -1) {
                me.project = data;
            } else {
                if (data.allowed_users.indexOf(me.currentUserId) !== -1) {
                    me.project = data;
                } else {
                    me.router.navigate(['/projects']);
                }
            }
        }).catch(error => console.log(error));
    }

    /**
     * Get all users
     */
    public getUsers(): void {
        this.users = null; // for show spinner each time
        this.usersService.getUsersByProjectId(this.projectId).subscribe((response) => {
            this.users = response.data;
            // console.log(this.users);
        });
    }

    async onFilterTasks(status: number) {
        const me = this;
        me.tasks = null;
        await me.tasksService.getTasksByStatus(status, me.projectId).then((data) => {
            // console.log(response);
            me.tasks = data;
        });
    }

    onAddNewTaskClick(): void {
        this.router.navigate(['tasks/add-task/', this.projectId]);
    }

    onProgressChange(task: Task) {
        this.tasksService.updateTaskProgress(task).subscribe((response) => {
            if (response.success === true) {
                this.notifyService.notifyUser('general.messages.saved');
            } else {
                this.notifyService.notifyUser('general.messages.error');
            }
        });
    }

    onSendNotificationClick(task: Task) {
        // console.log(task);
        this.userIds = this.tasksService.getAllowedUsersPerTask(task);
        if(this.userIds.length) {
            const notification = new Notification();
            notification.task_id = task.id;
            notification.user_ids = this.userIds
            notification.id = null;
            notification.text = null;
            // console.log(notification);

            const dialogRef = this.dialog.open(AddNotificationComponent, {
                data: notification,
                direction: 'rtl',
                minWidth: '50%'
            });

            dialogRef.afterClosed().subscribe(response => {
                this.getAllTasks();
            });
        } else {
            this.notifyService.notifyUser('tasks.no-notifications');
        }

    }

    onDeleteTaskClick(task: Task) {
        /** confirm object */
        const confirmation: Confirm = {
            'title': 'تأكيد الحذف',
            'message': 'هل أنت متأكد من حذف البيان؟ لا يمكن استرجاع البيانات المحذوفة'
        };

        const me = this;
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: confirmation,
            minWidth: '50%',
            direction: 'rtl',
        }).componentInstance.accepted.subscribe((accepted) => {
            if (accepted) {
                me.tasksService.deleteTask(task).subscribe(response => {
                    if (response.success === true) {
                        // console.log(response.message);
                        me.notifyService.notifyUser('general.messages.saved');
                        me.getAllTasks();
                    } else {
                        me.notifyService.notifyUser('general.messages.error');
                    }
                    me.getUsers();
                });
            } else {
                console.log('denied');
            }
        });
    }


    getUserPermissionOnTask(task: Task, permission: string): boolean {
        return this.tasksService.getUserPermissionOnTask(task, permission);
    }

    /**
     * Even listener for changes in pagination
     * @param event
     */
    public onPageChanged(event) {
        this.page = event;
    }

    /**
     * Opens user dialog
     * @param userdata
     */
    public onEditTaskClick(taskData: Task) {
        const dialogRef = this.dialog.open(EditTaskComponent, {
            data: [{'task': taskData, 'projectId': this.projectId}],
            direction: 'rtl',
            minWidth: '80%'
        });

        dialogRef.afterClosed().subscribe(user => {
            this.getAllTasks();
        });
    }

    /**
     * Opens user dialog
     * @param userdata
     */
    public onShowAttachment(taskData: Task) {
        const dialogRef = this.dialog.open(ShowAttachmentComponent, {
            data: taskData,
            direction: 'rtl',
            minWidth: '80%'
        });
    }
}
