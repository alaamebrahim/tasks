import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectsService} from '../projects.service';
import {Project} from '../project.model';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-view-projects',
    templateUrl: './view-projects.component.html',
    styleUrls: ['./view-projects.component.scss']
})
export class ViewProjectsComponent implements OnInit {

    projects: Project[] = [];
    loading = true;
    public imagePath = environment.projectsImagePath;

    constructor(
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
            me.projects = response
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

    onDeleteProjectClick(projectId: any) {

    }
}
