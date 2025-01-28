import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  private errorSubject = new BehaviorSubject<string | null>(null);

  // Observable for error messages
  get error$(): Observable<string | null> {
    return this.errorSubject.asObservable();
  }

  // Set a new error message
  setError(message: string): void {
    this.errorSubject.next(message);

    setTimeout(() => {
      this.clearError();
    }, 5000);

  }

  // Clear the current error message
  clearError(): void {
    this.errorSubject.next(null);
  }
}
