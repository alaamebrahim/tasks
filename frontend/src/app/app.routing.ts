import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

export const routes: Routes = [
    {
        path: '',
        component: PagesComponent, children: [
            {
                path: '',
                loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule',
                canActivate: [NgxPermissionsGuard],
                data: {
                    breadcrumb: 'الرئيسية', permissions: { only: ['dashboard_view'], redirectTo: '/login' }
                }
            },
            {
                path: 'users',
                loadChildren: 'app/pages/users/users.module#UsersModule',
                canActivate: [NgxPermissionsGuard],
                data: {
                    breadcrumb: 'المستخدمين', permissions: { only: ['user_view'], redirectTo: '/' }
                }
            },
            {
                path: 'mailbox',
                loadChildren: 'app/pages/mailbox/mailbox.module#MailboxModule',
                canActivate: [NgxPermissionsGuard],
                data: { breadcrumb: 'البريد الالكترونى', permissions: { only: ['mail_view'] } }
            },
            {
                path: 'tasks',
                loadChildren: 'app/pages/tasks/tasks.module#TasksModule',
                canActivate: [NgxPermissionsGuard],
                data: {
                    breadcrumb: 'المهام', permissions: { only: ['task_view'], redirectTo: '/' }
                }
            },
            {
                path: 'projects',
                loadChildren: 'app/pages/projects/projects.module#ProjectsModule',
                canActivate: [NgxPermissionsGuard],
                data: {
                    breadcrumb: 'المشاريع', permissions: { only: ['projects_view'], redirectTo: '/' }
                }
            }
        ]
    },
    { path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule' },
    { path: 'error', component: ErrorComponent, data: { breadcrumb: 'Error' } },
    { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
    useHash: true
});
