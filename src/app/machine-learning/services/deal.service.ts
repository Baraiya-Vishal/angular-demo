import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DealService {
  private apiUrl = `${environment.apiUrl}/update-deal-count`;

  constructor(private http: HttpClient) {}

  // Method to update the deal count by sending a POST request
  updateDealCount(data: any): Observable<any> {
    console.log("Payload being sent to API:", data);
    return this.http.post<any>(this.apiUrl, data);
  }
}
