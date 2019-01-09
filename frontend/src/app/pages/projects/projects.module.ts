import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {PipesModule} from '../../theme/pipes/pipes.module';
import {ViewProjectsComponent} from './view-projects/view-projects.component';
import {ProjectsService} from './projects.service';
import { AddProjectComponent } from './add-project/add-project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';

export const routes = [
    {
        path: '',
        component: ViewProjectsComponent,
        pathMatch: 'full',
        data: {
            breadcrumb: 'المشاريع', permissions: {only: ['projects_view'], redirectTo: '/'}
        }
    },
    {
        path: 'add-project',
        component: AddProjectComponent,
        data: {
            breadcrumb: 'مشروع جديد', permissions: {only: ['projects_add'], redirectTo: '/'}
        }
    },
    {
        path: 'update-project/:id',
        component: UpdateProjectComponent,
        data: {
            breadcrumb: 'تعديل بيانات مشروع', permissions: {only: ['projects_update'], redirectTo: '/'}
        }
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        PipesModule
    ],
    declarations: [
        ViewProjectsComponent,
        AddProjectComponent,
        UpdateProjectComponent,
    ],
    providers: [
        ProjectsService
    ],
    entryComponents: []
})

export class ProjectsModule {
}
