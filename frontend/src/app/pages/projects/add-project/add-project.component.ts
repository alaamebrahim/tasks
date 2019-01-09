import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../users/user.model';
import {UsersService} from '../../users/users.service';
import {ProjectsService} from '../projects.service';
import {NotifyUserService} from '../../../shared/services/notify-user.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-add-project',
    templateUrl: './add-project.component.html',
    styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

    public form: FormGroup;
    public users: User[];
    public working = false;
    public image: string;
    @ViewChild('fileInput') fileInput;

    constructor(
        public fb: FormBuilder,
        public usersService: UsersService,
        public projectService: ProjectsService,
        public notifyService: NotifyUserService,
        public router: Router,
    ) {
        this.form = this.fb.group({
            id: null,
            title: [null, Validators.compose([Validators.required])],
            description: [null, Validators.compose([Validators.required])],
            image: null,
            allowed_users: [null],
            opened: true
        });
    }

    ngOnInit() {
        this.getAllUsers();
    }

    onSaveProject() {
        const me = this;
        me.working = true;
        this.projectService.addProject(this.form.value)
            .subscribe((response) => {
                if (response.success === true) {
                    console.log(response.message);
                    this.notifyService.notifyUser('general.messages.saved');
                    this.router.navigate(['projects']);
                } else {
                    this.notifyService.notifyUser('general.messages.error');
                }
                me.working = false;
            });
    }

    /**
     * Get users for dropdown menu
     */
    getAllUsers(): void {
        this.usersService.getUsers().subscribe((response) => {
            // console.log(response);
            this.users = response['users'];
        });
    }

    addFile(): void {
        this.working = true;
        const fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            const fileToUpload = fi.files[0];
            // this.form.controls['picture'].setValue(fileToUpload);
            // console.log(fileToUpload);
            this.projectService.uploadProjectImage(fileToUpload).subscribe(response => {
                console.log(response);
                if (response.success === true) {
                    this.form.controls['image'].setValue(response.message);
                    // console.log(this.form.value);
                    this.image = response.message;
                } else {
                    this.notifyService.notifyUser('general.messages.error');
                }
                this.working = false;
            });
        } else {
            this.working = false;
        }

    }

}
