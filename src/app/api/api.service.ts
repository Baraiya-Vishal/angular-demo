import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {}

  // Basic GET request
  get(endpoint: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${endpoint}`);
  }

  // Basic POST request
  post(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${endpoint}`, data);
  }

  // Other methods like PUT, DELETE can be added as needed
}
