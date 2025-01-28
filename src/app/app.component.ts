import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from './componet-communication/notification/notification.component';
import { ProjectManagementModule } from './project-management/project-management.module';
import { CommonModule } from '@angular/common';
import { GlobalErrorComponent } from './shared/components/global-error/global-error.component';
import { GlobalSuccessComponent } from './shared/components/global-success/global-success.component';
import { TaskListComponent } from './task-management/task-list/task-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
// import { LandingPageComponent } from './landing-page/landing-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule,
    RouterOutlet,
    NotificationComponent,
    GlobalErrorComponent,
    GlobalSuccessComponent,
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    MatSidenavModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-demo';
}
