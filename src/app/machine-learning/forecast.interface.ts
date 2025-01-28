// machine-learning/forecast.interface.ts
export interface ProphetPrediction {
    ds: string;      // Date as a string
    yhat: number;    // Predicted value
    yhat_lower: number; // Lower bound of prediction
    yhat_upper: number; // Upper bound of prediction
  }
  
  export interface ProphetForecast {
    forecasted_date: string;
    predicted_value: ProphetPrediction[];
  }
  