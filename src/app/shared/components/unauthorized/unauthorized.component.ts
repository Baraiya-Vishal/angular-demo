import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-unauthorized',
  imports: [ MatCardModule,
  MatButtonModule,
  MatIcon,],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {
  constructor(private router: Router) {}

  goToLogin(): void {
    this.router.navigate(['/login']);  // Navigate to the login page
  }
}
