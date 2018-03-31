import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home.component';

import {LoginComponent} from './pages/users/login/login.component';
import {LogoutComponent} from './pages/users/logout/logout.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';

import {AuthGuard} from './services/auth_guard.service';
import {PageNotFoundComponent} from './pages/404/page-not-found.component';
import { ProfileComponent } from './pages/users/profile/profile.component';
import { ProfileResolver } from './services/resolvers/profile-resolver.service';
import { RolesGuardService } from './services/roles-guard.service';
import { RegisterSocialUserComponent } from './pages/users/register-social-user/register-social-user.component';
import { UnauthorizedComponent } from './pages/users/unauthorized/unauthorized.component';
import { UsersComponent } from './pages/users/users.component';
import { ContactUsComponent } from './pages/contact/contact-us/contact-us.component';
import { LocalesComponent } from './pages/locales/locales/locales.component';
import { LocalesResolverService } from './services/resolvers/locales-resolver.service';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

export const routes: Routes = [
    // Important: The sequence of path is important as the router go over then in sequential manner
    {path: '', redirectTo: '/index', pathMatch: 'full'},
    {
        path: 'index',
        component: LandingPageComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard, RolesGuardService],
        data: {roles: ['admin', 'facebook']},
        children: [  // Children paths are appended to the parent path
            {
                path: '',
                redirectTo: '/home/dashboard',
                pathMatch: 'full',
                data: [{selectedHeaderItemIndex: 1, selectedSubNavItemIndex: -1}]
            },
            // Default path (if no deep path is specified for home component like webui/home
            // then it will by default show ProductsComponent )
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: [{selectedHeaderItemIndex: 0, selectedSubNavItemIndex: -1}],
                children: []
            },
            {
                path: 'users',
                component: UsersComponent,
                canActivate: [AuthGuard, RolesGuardService],
                data: [{roles: ['admin']}]/*,
                children: [
                    {
                        path: 'edit/:id',
                        component: UserFormComponent,
                    }
                ]*/
            },
            {
                path: 'profile/:id',
                component: ProfileComponent,
                canActivate: [AuthGuard, RolesGuardService],
                data: {roles: ['admin', 'facebook']},
                resolve: {any : ProfileResolver}
            },
            {
                path: 'contact-us',
                component: ContactUsComponent,
                canActivate: [AuthGuard, RolesGuardService],
                data: {roles: ['admin', 'facebook']},
            },
            {
                path: 'change-locale/:locale',
                component: LocalesComponent,
                resolve: {localeData : LocalesResolverService},
                canActivate: [AuthGuard, RolesGuardService],
                data: {roles: ['admin', 'facebook']},
            }
        ]
    },
    {
        path: 'social-register',
        component: RegisterSocialUserComponent,
        canActivate: [RolesGuardService],
        data: {roles: ['guest']},
    },
    {path: 'login', component: LoginComponent, data: [{selectedHeaderItemIndex: -1, selectedSubNavItemIndex: -1}]},
    {path: 'logout', component: LogoutComponent, data: [{selectedHeaderItemIndex: -1, selectedSubNavItemIndex: -1}]},
    {path: 'unauthorized', component: UnauthorizedComponent, data: [{selectedHeaderItemIndex: -1, selectedSubNavItemIndex: -1}]},
    {path: '**', component: PageNotFoundComponent, data: [{selectedHeaderItemIndex: -1, selectedSubNavItemIndex: -1}]}

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule],
    declarations: [PageNotFoundComponent]
})
export class AppRoutingModule {
}
