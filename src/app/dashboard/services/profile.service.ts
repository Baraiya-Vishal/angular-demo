import { Injectable } from '@angular/core';
import { RequestService } from '../../core/request.service';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private requestService: RequestService, private authService: AuthService) {}

  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      throw new Error('User is not authenticated');
    }

    // Use switchMap to ensure userId is fetched before making API call
    return this.authService.user$.pipe(
      switchMap((user) => {
        if (!user || !user.userId) {
          throw new Error('User ID not found');
        }

        const profileUrl = `/api/employee/${user.userId}`;
        return this.requestService.request('GET', profileUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      })
    );
  }
}
