import { Component } from '@angular/core';
import { ArimaPredictionComponent } from '../components/arima-prediction/arima-prediction.component';
import { DealUpdateComponent } from '../components/deal-update/deal-update.component';
import { ProphetPredictionComponent } from '../components/prophet-prediction/prophet-prediction.component';

@Component({
  selector: 'app-machine-learning',
  imports: [ArimaPredictionComponent,DealUpdateComponent,ProphetPredictionComponent],
  templateUrl: './machine-learning.component.html',
  styleUrl: './machine-learning.component.css'
})
export class MachineLearningComponent {

}
