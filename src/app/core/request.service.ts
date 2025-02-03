import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlingService } from '../shared/services/error-handling-service.service';
import { ErrorResponse } from '../models/error.model';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private readonly excludedEndpoints = ['/auth/login']; // Endpoints that don't require JWT

  constructor(private http: HttpClient,private errorHandlingService: ErrorHandlingService) {}

  /**
   * Generic method for sending HTTP requests.
   * @param method - The HTTP method ('GET', 'POST', 'PUT', 'DELETE', etc.)
   * @param endpoint - The API endpoint
   * @param options - Request options (e.g., params, body, headers)
   * @returns Observable<any>
   */
  request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    options: {
      params?: { [key: string]: string | number };
      body?: any;
      headers?: { [key: string]: string };
    } = {}
  ): Observable<T> {
    // Resolve the full API URL
    const url = this.resolveApiUrl(endpoint);

    // Construct headers
    let headers = new HttpHeaders(options.headers || {});
    if (!this.isExcludedEndpoint(endpoint)) {
      const token = this.getToken();
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    // Construct params
    let params = new HttpParams();
    if (options.params) {
      for (const key of Object.keys(options.params)) {
        params = params.set(key, options.params[key].toString());
      }
    }

    // Send the HTTP request
    return this.http.request<T>(method, url, {
      headers,
      params,
      body: options.body,
    }).pipe(
      map((response) => this.processResponse<T>(response)), 
      catchError((error) => this.handleError(error)) 
    );


  }

  private processResponse<T>(response: any): T {
    if (response?.isSuccess && response?.statusCode === 200) {
      return response as T;
    } else {
      throw new Error(response?.errorMessages?.join(', ') || 'Unknown error occurred');
    }
  }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.status === 422 && error.error?.errors) {
  //     // Handling validation errors (return structured errors)
  //     return throwError(() => ({
  //       type: 'validation',
  //       errors: error.error.errors, // Form validation errors
  //     }));
  //   }

  //   let errorMessage = 'An unknown error occurred';
  //   if (error.error?.errorMessages?.length) {
  //     errorMessage = error.error.errorMessages.join(', ');
  //   } else if (error.error?.title) {
  //     errorMessage = error.error.title;
  //   }

  //   return throwError(() => ({
  //     type: 'general',
  //     message: errorMessage,
  //   }));
  // }

  private handleError(error: HttpErrorResponse) {
    const errorResponse = this.mapErrorResponse(error);
    // Ensure the mapped error response type matches the expected ErrorResponse structure
    this.errorHandlingService.handleError(errorResponse as ErrorResponse);  // Cast to ErrorResponse if needed
    return throwError(() => errorResponse);
  }

  /**
   * Resolves the correct API URL based on the environment configuration.
   * @param endpoint - The endpoint to append to the base URL
   * @returns Full API URL
   */
  private resolveApiUrl(endpoint: string): string {
    if (endpoint.startsWith('/project')) {
      return `${environment.pmsProjectApiUrl}${endpoint}`;
    }
    if (endpoint.startsWith('/api/employee') || endpoint.startsWith('/api/department') ) {
      return `${environment.pmsEmployeeApiUrl}${endpoint}`;
    }
    return `${environment.pmsApiUrl}${endpoint}`;
  }

  /**
   * Checks if the endpoint is excluded from requiring JWT.
   * @param endpoint - The API endpoint
   * @returns true if excluded, false otherwise
   */
  private isExcludedEndpoint(endpoint: string): boolean {
    return this.excludedEndpoints.some((excluded) => endpoint.startsWith(excluded));
  }

  /**
   * Retrieves the JWT token from localStorage or sessionStorage.
   * @returns JWT token or null if not found
   */
  private getToken(): string | null {
    return localStorage.getItem('jwtToken') || null;
  }
  /**
   * Maps the HttpErrorResponse to a more structured format for error handling.
   * @param error The HttpErrorResponse object
   * @returns Structured error response
   */
  private mapErrorResponse(error: HttpErrorResponse) {
    if (error.status === 422 && error.error?.errors) {
      return {
        type: 'validation',
        errors: error.error.errors, // Form validation errors
      };
    }

    let errorMessage = 'An unknown error occurred';
    if (error.error?.errorMessages?.length) {
      errorMessage = error.error.errorMessages.join(', ');
    } else if (error.error?.title) {
      errorMessage = error.error.title;
    }

    return {
      type: 'general',
      message: errorMessage,
    };
  }
}
