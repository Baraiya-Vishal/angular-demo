import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../shared/services/sidebar.service';
import {MatMenuModule} from '@angular/material/menu'
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isSidebarOpen = true;

  constructor(private router: Router ,private sidebarService: SidebarService,
              private authService: AuthService) {}

  @ViewChild(SidebarComponent) sidebarComponent: SidebarComponent | undefined;

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
   this.authService.logout();
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen; 
    this.sidebarService.toggleSidebar(); // Call the toggle function
  }


}
