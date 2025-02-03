export interface ErrorResponse {
    type: 'validation' | 'general' | 'server' | 'network' | 'authentication'; // specific error types
    message?: string;
    errors?: any; // For validation errors
  }
  