import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { User } from './user.model';
import { UsersService } from './users.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { LocaleService } from '../../shared/services/locale.service';
import { NotifyUserService } from '../../shared/services/notify-user.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [UsersService]
})
export class UsersComponent implements OnInit {
    public users: User[];
    public searchText: string;
    public page: any;
    public settings: Settings;
    private userPicPath = environment.userPicPath;
    constructor(
        public appSettings: AppSettings,
        public dialog: MatDialog,
        public usersService: UsersService,
        private translator: TranslateService,
        private notifyService: NotifyUserService,
        private router: Router
    ) {
        this.settings = this.appSettings.settings;
        this.translator.setDefaultLang(sessionStorage.getItem('locale'));
        this.translator.use(sessionStorage.getItem('locale'));
    }

    ngOnInit() {
        this.getUsers();
    }

    /**
     * Get all users
     */
    public getUsers(): void {
        this.users = null; // for show spinner each time
        this.usersService.getUsers().subscribe(users => {
            this.users = users;
            // console.log(this.users);
        });
    }

    /**
     * add new user to db
     * @param userdata
     */
    public addUser(userdata: User) {
        this.usersService.addUser(userdata).subscribe(response => {
            if (response.success === true) {
                this.notifyService.notifyUser('general.messages.saved');
            } else {
                this.notifyService.notifyUser('general.messages.error');
            }
            this.getUsers();
        }, error => {
            console.log(error);
            this.notifyService.notifyUser('general.messages.error');
        });
    }

    /**
     * update user data
     * @param userdata
     */
    public updateUser(userdata: User) {
        this.usersService.updateUser(userdata).subscribe(response => {
            if (response.success === true) {
                // console.log(response.message);
                this.notifyService.notifyUser('general.messages.saved');
            } else {
                this.notifyService.notifyUser(response.message);
            }
            this.getUsers();
        }, error => {
            console.log(error);
            this.notifyService.notifyUser('general.messages.error');
        });
    }

    /**
     * Delete user data
     * @param userdata
     */
    public deleteUser(userdata: User) {
        this.usersService.deleteUser(userdata).subscribe(response => {
            if (response.success === true) {
                // console.log(response.message);
                this.notifyService.notifyUser('general.messages.saved');
            } else {
                this.notifyService.notifyUser('general.messages.error');
            }
            this.getUsers();
        });
    }

    /**
     * Block user
     * @param user
     */
    public onBlockUser(userdata) {
        this.usersService.blockUser(userdata).subscribe(response => {
            if (response.success === true) {
                // console.log(response.message);
                this.notifyService.notifyUser('general.messages.saved');
            } else {
                this.notifyService.notifyUser('general.messages.error');
            }
            this.getUsers();
        });
    }

    /**
     * Even listener for changes in pagination
     * @param event
     */
    public onPageChanged(event) {
        this.page = event;
        this.getUsers();
        if (this.settings.fixedHeader) {
            document.getElementById('main-content').scrollTop = 0;
        } else {
            document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
        }
    }

    /**
     * Opens user dialog
     * @param userdata
     */
    public openUserDialog(userdata) {
        const dialogRef = this.dialog.open(UserDialogComponent, {
            data: userdata
        });
        dialogRef.afterClosed().subscribe(user => {
            this.getUsers();
        });
    }

    public goToRolesPage() {
        this.router.navigate(['users/roles']);
    }
}
