import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProjectsComponent } from './projects/projects.component';
import { LoginComponent } from './login/login.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';

export const projectManagementRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'projects/project-details/:id', component: ProjectDetailsComponent },
    { path: 'tasks', component: TasksComponent },
    { path: 'login', component: LoginComponent },
    { path: 'projects/add', component: AddProjectComponent },
    { path: 'projects/edit/:id', component: EditProjectComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];