// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // For displaying error messages
import { environment } from '../../../environments/environment';
import { RequestService } from '../../core/request.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  constructor(
    private requestService: RequestService,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar for notifications
  ) { }

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkAuthenticationStatus());

  private checkAuthenticationStatus(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('jwtToken');
      return !!token;
    }else return false
    // Return true if token exists in localStorage}

  }

  // Observable that other components can subscribe to
  get isAuthenticated$() {
    return this.isAuthenticatedSubject.asObservable();
  }

  login(email: string, password: string): void {

    const loginUrl = `${environment.authenticationUrl}?email=${encodeURIComponent(
      email
    )}&password=${encodeURIComponent(password)}`;

    this.requestService
      .request('GET', loginUrl, {
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe({
        next: (response: any) => {
          console.log('Login successful', response);
          if (response.result) {
            localStorage.setItem('jwtToken', response.token);
            localStorage.setItem('userId', "d1a92ff8-9a67-4aeb-8869-c47429adf760");
            console.log("token");
            this.isLoggedIn = true;
            this.isAuthenticatedSubject.next(this.isLoggedIn);
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

  // auth.service.ts
  logout(): void {
    localStorage.removeItem('jwtToken'); // Remove the token from localStorage
    localStorage.removeItem('userId');
    this.isLoggedIn = false;
    this.isAuthenticatedSubject.next(this.isLoggedIn);
    this.router.navigate(['/login']); // Redirect to login page
  }
  
}
