import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {UsersService} from '../../../services/api/users.service';
import {User} from '../users.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { LocaleService } from '../../../services/api/locale.service';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class UserFormComponent implements OnInit {

    user: any = new User();
    roles: any;
    userId: number;
    // Form group
    public usersForm: FormGroup;


    constructor(private route: ActivatedRoute,
                private router: Router,
                private usersService: UsersService,
                private translator: LocaleService,
                private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.getAllRoles();
    }

    ngBeforeViewInit() {
        this.getData();
    }

    getAllRoles() {
        this.usersService.getAllRoles().then(roles => {
            this.roles = roles;
        });
    }

    getData() {
        var me = this;
        this.route.params
            .switchMap(function (params: Params) {
                me.userId = params['id'];
                return me.usersService.getUserData(params['id'])
            })
            .subscribe(function (resp) {
                this.user = resp;
                console.log(this.user);
                /*this.usersForm.setValue({
                    userName :[ resp[0].userName ]
                });*/
            });
    }

    addOrRemoveRole(role) {
        if (this.user.role.indexOf(role) === -1) {
            this.user.role.push(role);
        } else {
            const index = this.user.role.indexOf(role);
            this.user.role.splice(index, 1);
        }
    }

    submitForm() {

    }

}
