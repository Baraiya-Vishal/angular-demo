import { Component } from '@angular/core';
import { ArimaService } from '../../services/arima.service';
import { CommonModule } from '@angular/common';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';

@Component({
  selector: 'app-arima-prediction',
  imports: [CommonModule],
  templateUrl: './arima-prediction.component.html',
  styleUrls: ['./arima-prediction.component.css']
})
export class ArimaPredictionComponent {

  forecast: any[] = [];
  loading: boolean = false;

  constructor(private arimaService: ArimaService,
              private errorHandler: ErrorHandlerService) {}

  getArimaPrediction(): void {
    this.loading = true;
    this.arimaService.getArimaPrediction().subscribe({
      next: (data: any[]) => {
        // Assign the received data to forecast
        this.forecast = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.errorHandler.setError('Failed to fetch the ARIMA forecast.');
        this.loading = false;
      },
    });
  }
}


// curl -X GET "http://127.0.0.1:5000/forecast/arima" -H "X-SIGNATURE: 05e72164f413975e977b8088bde5b1cee080a1ad3e339f449cd503a8e78b122ae7ddc4639d5672dce9f160ef576a4147b06085193bca18c1ee53b7dfa02bff836928810730ea29529974a223d965970605e1277cdf33761b5cb3d885f49e02270e6277d77ab8b71e4ff6d810fcbcb8703b317f08f1474acf097112c9a932911bd29f59f83a116c4e3b2de4d1c2637e2e876c4601c5d5dceeba07990e99c9c2be320c19c07806c64ddd170228f6feb65fa479d9d7923dffeafcc7a41870eb0df221969f04109271219f6b8bfcaa9ccac7f4447df0a7feb0a1b97702819738c23e86c44c52e0a870ff25dc3f323c15ae3a4ab13abfa6bba941ae57f87eec1595fb"



// curl -X GET "http://127.0.0.1:5000/forecast/arima" 


// curl -X POST "http://127.0.0.1:5000/update-deal-count" -H "Content-Type: application/json" -H "X-SIGNATURE: 53f8f1da7b578b18500814ff42b47df5d17bcd3faea8d187ec9deed77cffbfbeff97147d25a3e0fbbd69a0996ae8f5f69e1f989ec1807add753c77bb58779c7e50182b018861c422b1a8ddf0e451f414f744a65cd2645e8fa62de4aa5e21197fd39c123893d13c1aa2d7d6a045511125b25e93877a49248c2efb9ec271431b89d9571a7f736a9e5108bd584a26aefa88c4dcc31864605f91613f7c42bbb6e77383c44b333eb7b9ab6acef35bdbaa5a5231539548859746d13a5f83833e15bec37deb6590ef783a6e67c249fe6063582ed505243b07a5824dfdc53baf031c3c6aa7e975b662feeb4d0e47478d86ede498b6020595028ee8db757c43e52e5b3dc7" -d '{"date":"2025-01-10","total_deals":100}'
