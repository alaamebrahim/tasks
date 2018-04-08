import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { User } from './user.model';
import { UsersService } from './users.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { LocaleService } from '../../shared/services/locale.service';

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
    constructor(
        public appSettings: AppSettings,
        public dialog: MatDialog,
        public usersService: UsersService,
        private translator: TranslateService,
        // private localeService: LocaleService
    ) {
        this.settings = this.appSettings.settings;
        this.translator.setDefaultLang(sessionStorage.getItem('locale'));
        this.translator.use(sessionStorage.getItem('locale'));
    }

    ngOnInit() {
        this.getUsers();
    }

    public getUsers(): void {
        this.users = null; // for show spinner each time
        this.usersService.getUsers().subscribe(users => this.users = users);
    }
    public addUser(userdata: User) {
        this.usersService.addUser(userdata).subscribe(user => this.getUsers());
    }
    public updateUser(userdata: User) {
        this.usersService.updateUser(userdata).subscribe(user => this.getUsers());
    }
    public deleteUser(userdata: User) {
        this.usersService.deleteUser(userdata.id).subscribe(user => this.getUsers());
    }


    public onPageChanged(event) {
        this.page = event;
        this.getUsers();
        if (this.settings.fixedHeader) {
            document.getElementById('main-content').scrollTop = 0;
        } else {
            document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
        }
    }

    public openUserDialog(userdata) {
        const dialogRef = this.dialog.open(UserDialogComponent, {
            data: userdata
        });

        dialogRef.afterClosed().subscribe(user => {
            if (user) {
                (user.id) ? this.updateUser(user) : this.addUser(user);
            }
        });
    }
}
