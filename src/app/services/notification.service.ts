import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  private notificationSubject = new BehaviorSubject<string | null>(null);

  // Observable to expose the notification state
  notification$: Observable<string | null> = this.notificationSubject.asObservable();
  // Method to trigger a new notification
  notify(message: string) {

    this.notificationSubject.next(message);
  }

  // Method to clear the notification
  clear() {
    this.notificationSubject.next(null);
  }
}
