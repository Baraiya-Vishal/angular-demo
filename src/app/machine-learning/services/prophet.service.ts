import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProphetService {

  private apiUrl = `${environment.apiUrl}/forecast/prophet`;

  constructor(private http: HttpClient) { }

  // Method to get the Prophet prediction
  getProphetPrediction(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
