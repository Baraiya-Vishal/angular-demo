import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Department } from '../../models/department.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { DepartmentService } from '../services/department.service';
import { MatError } from '@angular/material/form-field';
import { ValidationErrorHandlingService } from '../../shared/services/validation-error-handling.service';


@Component({
  selector: 'app-department-dialog',
  imports: [ 
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    CommonModule,
    FormsModule,
    MatCheckbox,
    MatCheckboxModule,
  ],
  templateUrl: './department-dialog.component.html',
  styleUrl: './department-dialog.component.css'
})
export class DepartmentDialogComponent {
  serverValidationErrors: { [key: string]: string[] } = {};
  department: Department = { id: 0, name: '', isActive: true };
  myerror: string = '';

  constructor(
    private validationErrorHandlingService: ValidationErrorHandlingService,
    private cdRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private departmentService: DepartmentService,
    public dialogRef: MatDialogRef<DepartmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Department | null
  ) {
    this.department = data ? { ...data } : { id: 0, name: '', isActive: true };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(departmentForm: any): void {
    if (this.department.id) {
      // Update department logic (if any)
    } else {
      this.createDepartment(this.department.name, this.department.isActive, departmentForm);
    }

    if (this.serverValidationErrors) {
      this.cdRef.detectChanges();
      return;
    }

    this.dialogRef.close(this.department);
  }

  createDepartment(name: string, isActive: boolean, departmentForm: any): void {
    const newDepartment: Department = { id: 0, name, isActive };

    this.departmentService.createDepartment(newDepartment).subscribe({
      next: (data) => {
        this.serverValidationErrors = {};
        this.snackBar.open('Department created successfully', 'Close', { duration: 3000 });
        this.cdRef.detectChanges();  // Force UI update
      },
      error: (error) => {
        if (error.type === 'validation') {
          this.serverValidationErrors = { ...error.errors }; // Ensure deep copy

          Object.keys(error.errors).forEach((field) => {
            this.validationErrorHandlingService.setValidationErrors(field, error.errors[field]);
            const control = departmentForm.controls[field];
            if (control) {
              this.validationErrorHandlingService.setErrorOnControl(control, field);
            }
          });
          
          // // Manually mark the deptName as invalid using setErrors
          // if (this.serverValidationErrors['Name']) {
          //   deptName.control.setErrors({ 'serverError': this.serverValidationErrors['Name'][0] });
          // }

          this.cdRef.markForCheck();  // Trigger UI update for OnPush components
          console.log("Validation Errors:", this.serverValidationErrors);
        } else {
          this.snackBar.open(error.message, 'Close', { duration: 3000 });
        }
      }
    });
  }

  // getErrorMessage(field: string): string {
  //   return this.serverValidationErrors[field]?.[0] || ''; // Extract first error message
  // }


  getErrorMessage(field: string): string {
    return this.validationErrorHandlingService.getErrorMessage(field);
  }

}
