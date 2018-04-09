import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import { RolesGuardService } from './shared/services/roles-guard.service';
import { AuthGuard } from './shared/services/auth_guard.service';

export const routes: Routes = [
    {
        path: '',
        component: PagesComponent, children: [
            {
                path: '',
                loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule',
                canActivate: [AuthGuard, RolesGuardService],
                data: { breadcrumb: 'الرئيسية' , roles: ['root', 'admin']}
            },
            {
                path: 'users',
                loadChildren: 'app/pages/users/users.module#UsersModule',
                canActivate: [AuthGuard, RolesGuardService],
                data: { breadcrumb: 'المستخدمين', roles: ['root', 'admin']}
            },
            {
                path: 'mailbox',
                loadChildren: 'app/pages/mailbox/mailbox.module#MailboxModule',
                canActivate: [AuthGuard, RolesGuardService],
                data: { breadcrumb: 'البريد الالكترونى', roles: ['root', 'admin']}
            },

            { path: 'ui', loadChildren: 'app/pages/ui/ui.module#UiModule', data: { breadcrumb: 'UI' } },
            { path: 'form-controls',
            loadChildren: 'app/pages/form-controls/form-controls.module#FormControlsModule', data: { breadcrumb: 'Form Controls' } },
            { path: 'tables', loadChildren: 'app/pages/tables/tables.module#TablesModule', data: { breadcrumb: 'Tables' } },
            { path: 'icons', loadChildren: 'app/pages/icons/icons.module#IconsModule', data: { breadcrumb: 'Material Icons' } },
            { path: 'tasks', loadChildren: 'app/pages/tasks/tasks.module#TasksModule', data: { breadcrumb: 'المهام' } },
            { path: 'schedule', loadChildren: 'app/pages/schedule/schedule.module#ScheduleModule', data: { breadcrumb: 'Schedule' } },
            { path: 'chat', loadChildren: 'app/pages/chat/chat.module#ChatModule', data: { breadcrumb: 'Chat' } },
            { path: 'maps', loadChildren: 'app/pages/maps/maps.module#MapsModule', data: { breadcrumb: 'Maps' } },
            { path: 'charts', loadChildren: 'app/pages/charts/charts.module#ChartsModule', data: { breadcrumb: 'Charts' } },
            { path: 'dynamic-menu',
            loadChildren: 'app/pages/dynamic-menu/dynamic-menu.module#DynamicMenuModule', data: { breadcrumb: 'Dynamic Menu' } },
            { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } },
            { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } }
        ]
    },
    { path: 'landing', loadChildren: 'app/pages/landing/landing.module#LandingModule' },
    { path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule' },
    { path: 'register', loadChildren: 'app/pages/register/register.module#RegisterModule' },
    { path: 'error', component: ErrorComponent, data: { breadcrumb: 'Error' } },
    { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
    // useHash: true
});