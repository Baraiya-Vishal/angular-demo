import { Component,OnInit } from '@angular/core';
import { SuccessHandlerService } from '../../services/success-handler.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-global-success',
  imports: [CommonModule],
  templateUrl: './global-success.component.html',
  styleUrl: './global-success.component.css'
})
export class GlobalSuccessComponent  implements OnInit {
  successMessage: string | null = null;

  constructor(private successHandlerService: SuccessHandlerService) {}

  ngOnInit(): void {
    this.successHandlerService.success$.subscribe((message) => {
      this.successMessage = message;
    });
  }

  closeSuccess(): void {
    this.successHandlerService.clearSuccess();
  }
}