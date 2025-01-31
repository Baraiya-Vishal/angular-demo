import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Department } from '../../models/department.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-department-dialog',
  imports: [ MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    CommonModule,
    FormsModule,
    MatCheckbox,
  ],
  templateUrl: './department-dialog.component.html',
  styleUrl: './department-dialog.component.css'
})
export class DepartmentDialogComponent {

  department: Department;

  constructor(
    public dialogRef: MatDialogRef<DepartmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Department | null
  ) {
    // If data is provided, populate the form with it
    this.department = data ? { ...data } : { id: 0, name: '' ,isActive: true};
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.department);
  }
}
