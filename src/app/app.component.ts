import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from './componet-communication/notification/notification.component';
import { ProjectManagementModule } from './project-management/project-management.module';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GlobalErrorComponent } from './shared/components/global-error/global-error.component';
import { GlobalSuccessComponent } from './shared/components/global-success/global-success.component';
import { TaskListComponent } from './task-management/task-list/task-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from './shared/services/auth.service';
import { ButtonConfig } from './interface/ButtonConfig';
// import { LandingPageComponent } from './landing-page/landing-page.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
@Component({
  selector: 'app-root',
  imports: [RouterModule,
    RouterOutlet,
    NotificationComponent,
    GlobalErrorComponent,
    GlobalSuccessComponent,
    CommonModule,
    MainLayoutComponent,
    MatSidenavModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-demo';
  layoutType: string = 'main';
  isLoggedIn: boolean = false;  // Track whether the user is logged in

  constructor(private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe(() => {
      let route = this.activatedRoute.root;
      while (route.firstChild) {
        route = route.firstChild;
      }

      // Set the layout dynamically based on route data
      this.layoutType = route.snapshot.data['layout'] || 'main';
    });
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isLoggedIn = isAuthenticated;  // Update the state when it changes
    });
  }

}
