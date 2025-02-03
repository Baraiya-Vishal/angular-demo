import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export  class ValidationErrorHandlingService {
  private serverValidationErrors: { [key: string]: string[] } = {};

  constructor() {}

  /**
   * Set validation errors for a field.
   * @param field The form field name
   * @param errors The error messages for the field
   */
  setValidationErrors(field: string, errors: string[]): void {
    this.serverValidationErrors[field] = errors;
  }

  /**
   * Get the validation error message for a specific field.
   * @param field The form field name
   * @returns The error message or an empty string
   */
  getErrorMessage(field: string): string {
    return this.serverValidationErrors[field]?.[0] || ''; // Return the first error message for the field
  }

  /**
   * Set server-side validation errors on the corresponding form control.
   * @param formControl The form control to set the errors on
   * @param field The form field name
   */
  setErrorOnControl(formControl: FormControl, field: string): void {
    if (this.serverValidationErrors[field]) {
      formControl.setErrors({ 'serverError': this.serverValidationErrors[field][0] });
    }
  }

  /**
   * Clear all validation errors.
   */
  clearErrors(): void {
    this.serverValidationErrors = {};
  }

   /**
   * Set errors for all controls in a FormGroup based on the server response.
   * @param formGroup The form group whose controls should be updated
   */
   setErrorsOnFormGroup(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        this.setErrorOnControl(control, field); // Apply error to each control
      }
    });
  }

}
