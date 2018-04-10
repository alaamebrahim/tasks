import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DragulaModule } from 'ng2-dragula';
import { SharedModule } from '../../shared/shared.module';
import { TasksComponent } from './tasks.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TasksService } from './tasks.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../../theme/pipes/pipes.module';
export const routes = [
  { path: '', component: TasksComponent, pathMatch: 'full' },
  {
    path: 'add-task',
    component: AddTaskComponent,
    data: { breadcrumb: 'تكليف بمهمة جديدة'}
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
    EditTaskComponent
  ],
  providers: [
    TasksService
  ],
  entryComponents: [
    EditTaskComponent
  ]
})
export class TasksModule { }
