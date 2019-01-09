import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectsService} from '../projects.service';
import {Project} from '../project.model';
import {environment} from '../../../../environments/environment';
import {ConfirmationDialogComponent} from '../../../theme/components/confirmation-dialog/confirmation-dialog.component';
import {Confirm} from '../../../theme/components/confirmation-dialog/confirm.model';
import {MatDialog} from "@angular/material";

@Component({
    selector: 'app-view-projects',
    templateUrl: './view-projects.component.html',
    styleUrls: ['./view-projects.component.scss']
})
export class ViewProjectsComponent implements OnInit {

    projects: Project[] = [];
    loading = true;
    public imagePath = environment.projectsImagePath;

    /** Detect confirmation dialog action */
    @ViewChild(ConfirmationDialogComponent) confirmationDialogComponent;


    constructor(
        public dialog: MatDialog,
        private router: Router,
        private projectService: ProjectsService
    ) {
    }

    ngOnInit() {
        this.getProjectsList();
    }

    /**
     * Get project list
     */
    async getProjectsList() {
        const me = this;
        await me.projectService.getProjectsList().then(response => {
            me.projects = response;
        });
        me.loading = false;
    }

    /**
     * Add project button click listener
     */
    onAddNewProjectClick() {
        this.router.navigate(['/projects/add-project']);
    }

    /**
     * Update project button click listener
     */
    onUpdateProjectClick(projectId: any) {
        this.router.navigate(['/projects/update-project/' + projectId]);
    }

    async onDeleteProjectClick(project: any) {

        /** confirm object */
        const confirmation: Confirm = {
            'title': 'تأكيد الحذف',
            'message': 'هل أنت متأكد من حذف البيان؟ لا يمكن استرجاع البيانات المحذوفة'
        };

        const me = this;
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: confirmation,
            minWidth: '50%',
            direction: 'rtl',
        }).componentInstance.accepted.subscribe((accepted) => {
            if (accepted) {
                me.projectService.deleteProject(project).then(data => {
                    me.projects = data;
                });
            } else {
                console.log('denied');
            }
        });
    }
}
