import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule, Pipe, PipeTransform } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Third Party Modules
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ClarityModule } from '@clr/angular';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarHttpModule } from '@ngx-loading-bar/http';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {MatButtonModule, MatCheckboxModule, MatSidenavModule, MatMenuModule, MatIconModule,
    MatToolbarModule, MatInputModule, MatCardModule, MatSlideToggleModule, MatListModule} from '@angular/material';

import {
    NbActionsModule, NbContextMenuModule, NbMenuService, NbSearchModule, NbThemeModule,
    NbUserModule, NbSpinnerService, NbCheckboxModule, NbTabsetModule
} from '@nebular/theme';
import { NbSidebarModule, NbLayoutModule, NbMenuModule, NbCardModule, NbSidebarService } from '@nebular/theme';
import { AuthServiceConfig, AuthService } from 'angular5-social-login';
// import { CustomFormsModule } from '@ng-validators/ng-validators';
import { ModalDialogModule } from 'ngx-modal-dialog';
// Local App Modules
import { AppRoutingModule } from './app-routing.module';

// Directives
import { TrackScrollDirective } from './directives/track_scroll/track_scroll.directive';

// Components
import { HeaderComponent } from './components/header/header.component';

// Pages  -- Pages too are components, they contain other components
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './pages/users/login/login.component';
import { LogoutComponent } from './pages/users/logout/logout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Services
import { AppConfig, /*getAuthServiceConfigs*/ } from './app-config';
import { UserInfoService } from './services/user-info.service';
import { AuthGuard } from './services/auth_guard.service';
import { ApiRequestService } from './services/api/api-request.service';
import { LocaleService } from './services/api/locale.service';
import { LoginService } from './services/api/login.service';
import { RolesGuardService } from './services/roles-guard.service';
import { UsersComponent } from './pages/users/users.component';
import { UsersService } from './services/api/users.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { RegisterSocialUserComponent } from './pages/users/register-social-user/register-social-user.component';
import { DataContainerService } from './services/data-container.service';
import { UnauthorizedComponent } from './pages/users/unauthorized/unauthorized.component';
import { ProfileComponent } from './pages/users/profile/profile.component';
import { ProfileResolver } from './services/resolvers/profile-resolver.service';
import { ContactUsComponent } from './pages/contact/contact-us/contact-us.component';
import { ContactUsService } from './services/api/contact-us.service';
import { RecordsComponent } from './pages/users/records/records.component';
import { LocalesResolverService } from './services/resolvers/locales-resolver.service';
import { LocalesComponent } from './pages/locales/locales/locales.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

/*const providers = {
    'facebook': {
        'clientId': '2122500471311729',
        'apiVersion': 'v2.12' // like v2.4
    }
};*/
// Angular2SocialLoginModule.loadProvidersScripts(providers);

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({

    imports: [
        // Material design modules..
        MatButtonModule, MatCheckboxModule, MatSidenavModule, MatMenuModule, MatIconModule, MatToolbarModule,
        MatInputModule, MatCardModule, MatSlideToggleModule, MatListModule,
        ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
        BrowserModule, BrowserAnimationsModule, FormsModule,
        ReactiveFormsModule, HttpClientModule, RouterModule,
        // Thirdparty Module
        NgxDatatableModule, NgxChartsModule, ClarityModule.forChild(),
        NbThemeModule.forRoot({ name: 'default' }), // Theme default or cosmic
        NbMenuModule.forRoot(), // theme menu
        NbLayoutModule, NbSidebarModule, NbCardModule, NbActionsModule,
        NbSearchModule, NbUserModule, NbContextMenuModule, NbCheckboxModule,
        NbTabsetModule, Angular2FontawesomeModule,
        AppRoutingModule, // Local App Modules
        TranslateModule.forRoot({ // Translation module
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        NgSelectModule, // Select2
        SnotifyModule, // notify
        // CustomFormsModule, // Validator
        LoadingBarHttpModule, LoadingBarHttpClientModule, LoadingBarRouterModule,
        LoadingBarModule.forRoot(), // loading bar
        ModalDialogModule.forRoot(), // Modal
        CarouselModule.forRoot()

    ],

    declarations: [
        SafePipe, // pipes
        // Components
        HeaderComponent,
        // Pages -- Pages too are components, they contain other components
        AppComponent, HomeComponent, LoginComponent, LogoutComponent, DashboardComponent, UsersComponent,
        UserFormComponent, RegisterSocialUserComponent, UnauthorizedComponent, ProfileComponent,
        // Directives
        TrackScrollDirective, UsersComponent,
        ContactUsComponent, RecordsComponent, LocalesComponent,
        LandingPageComponent,
    ],

    providers: [
        AuthGuard, RolesGuardService, UserInfoService, LocaleService, ApiRequestService, LoginService,
        AppConfig, { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true },
        UsersService, { provide: 'SnotifyToastConfig', useValue: ToastDefaults }, SnotifyService, // Notify
        NbSidebarService, NbMenuService, NbSpinnerService, // theme
        ContactUsService,
        /*{ // Facebook authentication system
            provide: AuthServiceConfig,
            useFactory: getAuthServiceConfigs
        }, AuthService*/, DataContainerService, // Can carry any type of data between routes
        ProfileResolver, LocalesResolverService,

    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
