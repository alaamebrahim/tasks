import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../users/user.model';
import {UsersService} from '../../users/users.service';
import {ProjectsService} from '../projects.service';
import {NotifyUserService} from '../../../shared/services/notify-user.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Project} from '../project.model';

@Component({
    selector: 'app-update-project',
    templateUrl: './update-project.component.html',
    styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {

    private readonly id: string;
    public form: FormGroup;
    public users: User[];
    public working = false;
    public image: string;
    public project: Project;
    loading = true;
    @ViewChild('fileInput') fileInput;

    constructor(
        public fb: FormBuilder,
        public usersService: UsersService,
        public projectService: ProjectsService,
        public notifyService: NotifyUserService,
        public router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        // Get id
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        this.form = this.fb.group({
            id: null,
            title: [null, Validators.compose([Validators.required])],
            description: [null, Validators.compose([Validators.required])],
            image: null,
            allowed_users: [null],
            opened: null,
            created_at: null,
            updated_at: null,
            created_by: null,
        });
    }

    ngOnInit() {
        const me = this;
        me.getProjectById(this.id);
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
        this.usersService.getNonAdminsUsers().subscribe((response) => {
            // console.log(response);
            this.users = response;
        });
    }

    async getProjectById(projectId: any) {
        const me = this;
        await me.projectService.getProjectById(projectId).then(response => {
            console.log(response.opened);
            me.image = response.image;
            me.form.setValue(response);
        }).catch(error => console.log(error));
        me.loading = false;
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
