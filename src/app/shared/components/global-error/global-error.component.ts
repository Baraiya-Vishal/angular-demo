import { Component,OnInit } from '@angular/core';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-global-error',
  imports: [CommonModule],
  templateUrl: './global-error.component.html',
  styleUrl: './global-error.component.css'
})
export class GlobalErrorComponent implements OnInit {
  errorMessage: string | null = null;

  constructor(private errorHandlerService: ErrorHandlerService) {}

  ngOnInit(): void {
    this.errorHandlerService.error$.subscribe((message) => {
      this.errorMessage = message;
    });
  }

  closeError(): void {
    this.errorHandlerService.clearError();
  }
}
