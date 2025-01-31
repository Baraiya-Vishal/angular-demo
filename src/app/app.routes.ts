import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';  // Import the LandingPageComponent
import { ParentComponent } from './componet-communication/parent/parent.component';
import { projectManagementRoutes } from './project-management/project-management.routes';
import { PageNotFoundComponent } from './project-management/page-not-found/page-not-found.component';
import { MachineLearningComponent } from './machine-learning/machine-learning/machine-learning.component';
import { TaskManagementComponent } from './task-management/task-management/task-management.component';
import { authProjectManagementRoutes } from './auth/auth-routing.module';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { DepartmentComponent } from './master/department/department.component';
import { DesignationComponent } from './master/designation/designation.component';
import { ProjectStatusComponent } from './master/project-status/project-status.component';
import { ProjectTypeComponent } from './master/project-type/project-type.component';
import { ProjectTechnologyComponent } from './master/project-technology/project-technology.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { adminGuard } from './shared/guard/admin.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent, data: { layout: 'none' } },  // Add route for the root path ('/')
  { path: 'landng-page', component: LandingPageComponent },  // Add route for the root path ('/')
  { path: 'componet-communication', component: ParentComponent, canActivate: [AuthGuard] },  // Keep the route for ParentComponent
  // { path: 'project-management', children: projectManagementRoutes },
  { path: 'project-management', children: authProjectManagementRoutes },
  { path: 'login', component:LoginComponent , data: { layout: 'none' }},
  { path: 'machine-learning', component: MachineLearningComponent },
  { path: 'task-management', component: TaskManagementComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'master/department', component: DepartmentComponent, canActivate: [adminGuard] },
  { path: 'master/designation', component: DesignationComponent, canActivate: [adminGuard] },
  { path: 'master/project-status', component: ProjectStatusComponent, canActivate: [adminGuard] },
  { path: 'master/project-type', component: ProjectTypeComponent, canActivate: [adminGuard] },
  { path: 'master/project-technology', component: ProjectTechnologyComponent, canActivate: [adminGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent, data: { layout: 'none' } } ,
  // {path:'dashboard',component:DashboardComponent},
  { path: '**', component: PageNotFoundComponent }
];

