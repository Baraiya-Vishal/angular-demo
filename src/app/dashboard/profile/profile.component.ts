import { Component } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [ MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    DatePipe,
    CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  userProfile: any;
  userId: string = 'd1a92ff8-9a67-4aeb-8869-c47429adf760'; // Replace this with dynamic userId if needed

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    setTimeout(() => {
      if (typeof window !== 'undefined' && window.localStorage) {
        this.profileService.getUserProfile().subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.userProfile = response.result;
            }
          },
          error: (error) => {
            console.error('Error fetching profile', error);
            // Handle error, maybe show a message
          },
        });
      }
    }, 0);  
   
  }

  editProfile() {
    // You can navigate to the profile edit page, or open a form to edit the profile
    console.log('Redirecting to edit profile...');
  }
  
  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    // Optionally, navigate to login page
    console.log('Logged out successfully');
    // Example: this.router.navigate(['/login']);
  }
  
}
