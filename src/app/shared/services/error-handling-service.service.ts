import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorResponse } from '../../models/error.model';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor(private snackBar: MatSnackBar) {}

  /**
   * Processes and categorizes errors from an API response.
   * @param error The error object from the API
   */
  handleError(error: ErrorResponse) {
    // Ensure error.type exists and is valid, otherwise fallback to general error
    if (error?.type) {
      switch (error.type) {
        case 'validation':
          this.handleValidationError(error);
          break;
        case 'server':
          this.handleServerError(error);
          break;
        case 'network':
          this.handleNetworkError(error);
          break;
        case 'authentication':
          this.handleAuthenticationError(error);
          break;
        default:
          this.handleGeneralError(error);
          break;
      }
    } else {
      this.handleGeneralError(error); // If no type, handle as general error
    }
  }

  /**
   * Handles validation errors (field-specific errors).
   * @param error The validation error
   */
  private handleValidationError(error: ErrorResponse) {
    if (error.errors && Array.isArray(error.errors)) {
      // For validation errors, show each error in the snackbar
      error.errors.forEach((err) => {
        this.showSnackBar(`Validation error: ${err}`);
      });
    } else {
      // Show a fallback message if validation errors are not in expected format
      this.showSnackBar(`Validation Error: ${error.message || 'Please check the fields and try again.'}`);
    }
  }

  /**
   * Handles server-side errors (non-validation).
   * @param error The server error
   */
  private handleServerError(error: ErrorResponse) {
    this.showSnackBar(`Server Error: ${error.message || 'An error occurred on the server. Please try again later.'}`);
  }

  /**
   * Handles network errors (e.g., no internet, timeout, etc.).
   * @param error The network error
   */
  private handleNetworkError(error: ErrorResponse) {
    const errorMessage = error.message || 'Network Error: Unable to connect to the server. Please check your internet connection.';
    this.showSnackBar(errorMessage);
  }

  /**
   * Handles authentication errors (e.g., unauthorized, expired session).
   * @param error The authentication error
   */
  private handleAuthenticationError(error: ErrorResponse) {
    const errorMessage = error.message || 'Authentication failed. Please log in again.';
    this.showSnackBar(errorMessage);
  }

  /**
   * Handles general errors (for any error that does not fit into specific categories).
   * @param error The general error
   */
  private handleGeneralError(error: ErrorResponse) {
    const errorMessage = error?.message || 'An unexpected error occurred. Please try again later.';
    this.showSnackBar(errorMessage);
  }

  /**
   * Displays a message in a Snackbar.
   * @param message The message to display
   */
  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', { duration: 5000 });
  }
}
