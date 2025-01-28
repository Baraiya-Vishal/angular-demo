import { Injectable } from '@angular/core';
import { RequestService } from '../../core/request.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private requestService: RequestService) {}

  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      throw new Error('User is not authenticated');
    }

    // Assuming your backend API to get user profile is like: `/api/user/profile`
    const userId = localStorage.getItem('userId');
    const profileUrl = `/api/employee/${userId}`;
   
    return this.requestService.request('GET', profileUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }
}
