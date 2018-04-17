import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { UsersComponent } from './users.component';
import { UsersData } from './users.data';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { UsersService } from './users.service';
import { RolesComponent } from './roles/roles.component';
import { AddPermissionComponent } from './permissions/add-permission/add-permission.component';
import { RolesService } from './roles/roles.service';
import { PermissionsComponent } from './permissions/permissions.component';
import { AddRoleComponent } from './roles/add-role/add-role.component';

export const routes = [
  { path: '', component: UsersComponent, pathMatch: 'full' },
  {
    path: 'roles',
    component: RolesComponent,
    data: {
      breadcrumb: 'الصلاحيات', permissions: { only: ['root', 'admin'], redirectTo: '/' }
    },
  },
  {
    path: 'permissions',
    component: PermissionsComponent,
    data: {
      breadcrumb: 'التصاريح'/*, permissions: { only: ['root'], redirectTo: 'users/roles' }*/
    }
  },
  {
    path: 'add-permission',
    component: AddPermissionComponent,
    data: {
      breadcrumb: 'اضافة تصريح'/*, permissions: { only: ['root'], redirectTo: 'users/roles' }*/
    }
  },
  {
    path: 'add-role',
    component: AddRoleComponent,
    data: {
      breadcrumb: 'اضافة صلاحية'/*, permissions: { only: ['root'], redirectTo: 'users/roles' }*/
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(UsersData, { delay: 500 }),
    NgxPaginationModule,
    SharedModule,
    PipesModule,
  ],
  exports: [TranslatePipe],
  declarations: [
    UsersComponent,
    UserDialogComponent,
    RolesComponent,
    PermissionsComponent,
    AddRoleComponent,
    AddPermissionComponent,
  ],
  providers: [UsersService, RolesService],
  entryComponents: [
    UserDialogComponent
  ]
})
export class UsersModule { }
