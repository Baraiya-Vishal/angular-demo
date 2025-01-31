import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { HeaderComponent } from '../../header/header.component';
import { ButtonConfig } from '../../interface/ButtonConfig';
import { PageHeaderStateService } from '../../shared/services/page-header-state.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { PageHeaderComponent } from "../../shared/components/page-header/page-header.component";

@Component({
  selector: 'app-main-layout',
  imports: [
    HeaderComponent,
    SidebarComponent,
    RouterOutlet,
    CommonModule,
    PageHeaderComponent
],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  isLoggedIn: boolean = false; 
  headerTitle: string = '';
  headerButtons: ButtonConfig[] = [];

  constructor(private headerStateService: PageHeaderStateService,private authService: AuthService) {}

  ngOnInit(): void {

    this.authService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isLoggedIn = isAuthenticated;  // Update the state when it changes
      console.log(this.isLoggedIn);
    });

    // Subscribe to the title and buttons from the service
    this.headerStateService.title$.subscribe((title) => {
      this.headerTitle = title;
    });

    this.headerStateService.buttons$.subscribe((buttons) => {
      this.headerButtons = buttons;
    });
  }
}
