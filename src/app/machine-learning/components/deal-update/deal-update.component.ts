import { Component } from '@angular/core';
import { DealService } from '../../services/deal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuccessHandlerService } from '../../../shared/services/success-handler.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';

@Component({
  selector: 'app-deal-update',
  imports: [CommonModule, FormsModule],
  templateUrl: './deal-update.component.html',
  styleUrls: ['./deal-update.component.css']
})
export class DealUpdateComponent {
  date: string = '';
  totalDeals: number = 0;
  message: string = '';
  error: string | null = null;

  constructor(
    private dealService: DealService,
    private successHandlerService: SuccessHandlerService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  onSubmit(): void {
    // Wrap the data in an array to match the expected format
    const requestData = [{ date: this.date, total_deals: this.totalDeals }];
    
    this.dealService.updateDealCount(requestData).subscribe({
      next: (response) => {
        this.successHandlerService.setSuccess(response.message);
      },
      error: (err) => {
        this.errorHandlerService.setError(err.error.message);
      },
    });
  }
}
