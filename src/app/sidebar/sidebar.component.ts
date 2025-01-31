import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterLinkActive } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SidebarService } from '../shared/services/sidebar.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [MatSidenavModule,
    MatListModule,
    RouterLinkActive,
    RouterLink,
    MatExpansionModule,
    CommonModule,
    ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  isAdmin: boolean = false;

  constructor(private router: Router,private sidebarService: SidebarService,private authService: AuthService) {}
  // Method to handle navigation in sidebar
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  ngOnInit(): void {

    this.isAdmin = this.authService.isAdmin();
    console.log(this.isAdmin);
    console.log("admin asd");
    // this.sidebarService.sidebarOpen$.subscribe((isOpen) => {
    //   if (isOpen) {
    //     this.sidenav.open();
    //   } else {
    //     this.sidenav.close();
    //   }
    // });
  }

  ngAfterViewInit(): void {
    // Subscribe to the sidebar state after the view has been initialized
    this.sidebarService.sidebarOpen$.subscribe((isOpen) => {
      if (isOpen) {
        this.sidenav.open();
      } else {
        this.sidenav.close();
      }
    });
  }
}
