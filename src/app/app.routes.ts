import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';  // Import the LandingPageComponent
import { ParentComponent } from './componet-communication/parent/parent.component';
import { projectManagementRoutes } from './project-management/project-management.routes';
import { PageNotFoundComponent } from './project-management/page-not-found/page-not-found.component';
import { MachineLearningComponent } from './machine-learning/machine-learning/machine-learning.component';
import { TaskManagementComponent } from './task-management/task-management/task-management.component';
import { authProjectManagementRoutes } from './auth/auth-routing.module';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },  // Add route for the root path ('/')
  { path: 'componet-communication', component: ParentComponent },  // Keep the route for ParentComponent
  // { path: 'project-management', children: projectManagementRoutes },
  { path: 'project-management', children: authProjectManagementRoutes },
  { path: 'machine-learning', component: MachineLearningComponent },
  { path: 'task-management', component: TaskManagementComponent },
  // {path:'dashboard',component:DashboardComponent}
  { path: '**', component: PageNotFoundComponent }
];

