import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component'; 
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProjectsComponent } from './projects/projects.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [ RouterModule,
    CommonModule,
    DashboardComponent,
    LoginComponent,
    TasksComponent,
    ProjectsComponent,
    PageNotFoundComponent,
    ProjectDetailsComponent
  ]
})
export class ProjectManagementModule { }
