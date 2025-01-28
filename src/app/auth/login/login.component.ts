import { Component } from '@angular/core';
import { RequestService } from '../../core/request.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // For showing messages
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // For notifications
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    CommonModule],
  styleUrls: ['./login.component.css'] // Fix the typo from styleUrl to styleUrls
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(
    private requestService: RequestService,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar for snack notifications
  ) {}

  onLogin(): void {

    const loginUrl = `${environment.authenticationUrl}?email=${encodeURIComponent(
      this.email
    )}&password=${encodeURIComponent(this.password)}`;

    this.requestService
    .request('GET', loginUrl, {
      headers: { 'Content-Type': 'application/json' },
    })
    .subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        if (response.result) {
          localStorage.setItem('jwtToken', response.token);
          console.log("token");
          this.router.navigate(['/project-management/dashboard']);
        }
      },
      error: (error) => {
        console.error('Login failed', error);
        this.snackBar.open('Login failed. Please try again.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }
}
