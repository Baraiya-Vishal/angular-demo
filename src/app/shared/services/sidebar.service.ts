import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class SidebarService {
  private sidebarOpen = new BehaviorSubject<boolean>(true); // Initial state: open
  sidebarOpen$ = this.sidebarOpen.asObservable();

  toggleSidebar(): void {
    this.sidebarOpen.next(!this.sidebarOpen.value); // Toggle state
  }
}
