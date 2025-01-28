import { Component, OnInit } from '@angular/core';
import { ProphetService } from '../../services/prophet.service';
import { CommonModule } from '@angular/common';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';

@Component({
  selector: 'app-prophet-prediction',
  imports: [CommonModule],
  templateUrl: './prophet-prediction.component.html',
  styleUrls: ['./prophet-prediction.component.css']
})
export class ProphetPredictionComponent implements OnInit {

  prophet: any[] = [];

  constructor(private prophetService: ProphetService, private errorHandler: ErrorHandlerService) {}

  ngOnInit(): void {
   
  }

  getProphetPrediction(): void {
    this.prophetService.getProphetPrediction().subscribe({
      next: (data) => {
        this.prophet = data; // Store the array of predictions
      },
      error: (err) => {
        console.error('Error:', err);
        this.errorHandler.setError('Failed to fetch the Prophet forecast.');
      },
    });
  }
}
