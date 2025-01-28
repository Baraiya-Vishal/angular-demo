import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterLinkActive } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-sidebar',
  imports: [MatSidenavModule,
    MatListModule,
    RouterLinkActive,
    RouterLink,
    MatButton],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private router: Router) {}

  // Method to handle navigation in sidebar
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

}
