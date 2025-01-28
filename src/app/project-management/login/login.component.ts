import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void { }

  onLogin(): void {
    // Here you would usually make an API call to authenticate the user.
    if (this.username === 'admin' && this.password === 'admin') {
      // Navigate to the dashboard if the login is successful
      this.router.navigate(['/project-management/dashboard']);
    } else {
      // Show an error message if login fails
      this.loginError = 'Invalid username or password';
    }
  }
}
