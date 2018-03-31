import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { UsersService } from '../../services/api/users.service';
import { TranslateService } from '@ngx-translate/core';
import { LocaleService } from '../../services/api/locale.service';
import { ActivatedRoute } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { AppConfig } from '../../app-config';


export class User {
}

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class UsersComponent implements OnInit {

    // ngx-Datatable Variables
    columns: any[];
    rows: any[];
    user: any = new User();
    userId: string;
    roles: any[];
    @ViewChild('userEdit') userEdit: TemplateRef<any>;
    @ViewChild('isActive') isActive: TemplateRef<any>;
    @ViewChild('isBlocked') isBlocked: TemplateRef<any>;
    @ViewChild('role') role: TemplateRef<any>;
    @ViewChild('userAudio') audioPlayerRef: ElementRef;

    constructor(
        private usersService: UsersService,
        private translator: LocaleService,
        private route: ActivatedRoute,
        private notify: SnotifyService,
        private appConfig: AppConfig
    ) { }

    ngOnInit() {
        const heads = this.route.snapshot.data.usersResolver;
        this.getAllUsers();
        this.getAllRoles();
        this.columns = [
            {
                prop: 'id',
                name: this.translator.translate('user.table.fields.id'),
                flexGrow: 1,
                cellTemplate: this.userEdit
            },
            { prop: 'userName', name: this.translator.translate('user.table.fields.username'), flexGrow: 2 },
            { prop: 'email', name: this.translator.translate('user.table.fields.email'), flexGrow: 3 },
            { prop: 'active', name: this.translator.translate('user.table.fields.isActive'), flexGrow: 1, cellTemplate: this.isActive },
            { prop: 'blocked', name: this.translator.translate('user.table.fields.isBlocked'), flexGrow: 1, cellTemplate: this.isBlocked },
            { prop: 'role', name: this.translator.translate('user.table.fields.Authorization'), flexGrow: 1, cellTemplate: this.role },
        ];
    }

    getAllUsers() {
        this.usersService.findAll().subscribe((users) => {
            this.rows = users;
            console.log(this.rows);
        });
    }

    getAllRoles() {
        return this.usersService.getAllRoles().then(resp => {
            this.roles = resp;
            console.log(this.roles);
        });
    }

    onUserEvent(e) {
        if (e.type === 'click') {
            this.user = e.row;
        }
    }

    changeStatus(user: any, state: string) {
        this.notify.confirm('Are you sure you want to perform this action?', 'Confirm action', {
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            buttons: [
                {
                    text: 'Yes', action: () => {
                        if (state === 'active') {
                            this.usersService.updateUserActiveState(user.id, user.active)
                                .then((resp) => {
                                    if (resp === 1) {
                                        this.notify.success('Updated successfuly !');
                                    } else {
                                        this.notify.error('An error has occured !');
                                    }
                            });
                        } else if (state === 'block') {
                            this.usersService.updateUserBlockState(user.id, user.blocked)
                                .then((resp) => {
                                    if (resp === 1) {
                                        this.notify.success('Updated successfuly !');
                                    } else {
                                        this.notify.error('An error has occured !');
                                    }
                            });
                        }
                        this.notify.remove();
                    }
                },
                { text: 'No', action: () => {
                    if (state === 'active') {
                        user.active = !user.active;
                    } else if (state === 'block') {
                        user.blocked = !user.blocked;
                    }
                    this.notify.remove();
                } },
            ]
        });
    }

    performChangeUserState(user: any) {
        this.usersService.updateUserState(user)
            .then(response => {
                if (response && response !== 'undefined') {
                    if (response.operationStatus !== 'SUCCESS') {
                        // I must add something here when error occur
                        this.notify.error('Data not saved!');
                        console.log(response);
                        return;
                    }
                    this.notify.success('Data saved!');
                }
            }, error => {
                console.log(error);
                this.notify.error(error);
            });

    }

    changeUserRole(obj) {
        console.log(obj);
    }

    getAudioUrl(id: number) {
        return this.appConfig.baseApiPath + 'api/record/listen-record/' + id;
    }

    playAudio (record: any) {
        const me = this;
        me.audioPlayerRef.nativeElement.pause();
        me.audioPlayerRef.nativeElement.src = me.getAudioUrl(record.id);
        me.audioPlayerRef.nativeElement.type = record.mediaType;
        me.audioPlayerRef.nativeElement.play();
    }

}
