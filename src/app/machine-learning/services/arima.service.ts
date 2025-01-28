import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArimaService {

  private apiUrl = `${environment.apiUrl}/forecast/arima`;
  
  constructor(private http: HttpClient) { }

  getArimaPrediction(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
