import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuccessHandlerService {

  private successSubject = new BehaviorSubject<string | null>(null);

  // Observable for success messages
  get success$(): Observable<string | null> {
    return this.successSubject.asObservable();
  }

  // Set a new success message
  setSuccess(message: string): void {
    this.successSubject.next(message);
  }

  // Clear the current success message
  clearSuccess(): void {
    this.successSubject.next(null);
  }
  
}
