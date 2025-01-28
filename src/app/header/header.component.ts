import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-header',
  imports: [MatToolbarModule,
    MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    // Handle logout functionality
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }

}
