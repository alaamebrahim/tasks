import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../task.model';
import {environment} from '../../../../environments/environment';
import {CommentsService} from './comments.service';
import {Comment} from './comments.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserInfoService} from '../../../shared/services/user-info.service';
import {NotifyUserService} from '../../../shared/services/notify-user.service';
import {Project} from '../../projects/project.model';
import {NgxPermissionsService} from 'ngx-permissions';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

    @Input('task') task: Task;
    @Input('project') project: Project;
    public comments: Comment[] = [];
    public userImageDir = environment.userPicPath;
    public form: FormGroup;
    public loading = true;

    constructor(
        public fb: FormBuilder,
        private commentsService: CommentsService,
        private userInfoService: UserInfoService,
        private notifyService: NotifyUserService,
        private permissionService: NgxPermissionsService
    ) {
        this.form = this.fb.group({
            id: null,
            message: [null, Validators.required],
            user_id: null,
            task_id: null,
        });
    }

    ngOnInit() {
        this.getComments();

    }

    async getComments() {
        const me = this;
        if (this.permissionService.getPermissions().comment_view !== undefined) {
            await this.commentsService.getComments(this.task.id).then(data => {
                me.comments = data;
            }, error => console.log(error));
            me.loading = false;
        } else {
            me.comments = [];
            me.loading = false;
        }
    }

    onAddComment() {
        const me = this;
        me.form.controls['task_id'].setValue(this.task.id);
        me.form.controls['user_id'].setValue(this.userInfoService.getUserInfo().id);
        this.commentsService.addOrUpdateComment(this.form.value).then(data => {
            me.getComments();
            me.form.controls['message'].setValue(null);
            me.notifyService.notifyUser('general.messages.added-comment');
        }, error => {
            me.notifyService.notifyUser('general.messages.error');
        });
    }
}
