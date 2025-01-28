import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {

  notification: string | null = null;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notification$.subscribe((message) => {
      this.notification = message;
    });
  }

  clearNotification() {
    this.notificationService.clear();
  }
}
