import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DragulaModule} from 'ng2-dragula';
import {SharedModule} from '../../shared/shared.module';
import {TasksComponent} from './view-tasks/tasks.component';
import {AddTaskComponent} from './add-task/add-task.component';
import {EditTaskComponent} from './edit-task/edit-task.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TasksService} from './tasks.service';
import {NgxPaginationModule} from 'ngx-pagination';
import {PipesModule} from '../../theme/pipes/pipes.module';
import {AddNotificationComponent} from './add-notification/add-notification.component';
import {NotificationsService} from '../../shared/services/notifications.service';
import {ShowAttachmentComponent} from './show-attachment/show-attachment.component';
import {ProjectsService} from '../projects/projects.service';
import {CommentsComponent} from './comments/comments.component';
import {CommentsService} from './comments/comments.service';

export const routes = [
    {
        path: '',
        component: TasksComponent,
        pathMatch: 'full',
        data: {
            breadcrumb: 'المهام', permissions: {only: [], redirectTo: '/projects'}
        }
    },
    {
        path: 'add-task/:projectId',
        component: AddTaskComponent,
        data: {
            breadcrumb: 'تكليف بمهمة جديدة', permissions: {only: ['task_add'], redirectTo: '/'}
        }
    },
    {
        path: 'view-tasks/:projectId',
        component: TasksComponent,
        data: {
            breadcrumb: 'عرض المهام', permissions: {only: ['task_view'], redirectTo: '/projects'}
        }
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DragulaModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        PipesModule
    ],
    declarations: [
        TasksComponent,
        AddTaskComponent,
        EditTaskComponent,
        AddNotificationComponent,
        ShowAttachmentComponent,
        CommentsComponent,
        ShowAttachmentComponent
    ],
    providers: [
        TasksService,
        NotificationsService,
        ProjectsService,
        CommentsService
    ],
    entryComponents: [
        EditTaskComponent,
        AddNotificationComponent,
        ShowAttachmentComponent
    ]
})
export class TasksModule {
}
