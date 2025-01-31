import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog',
  imports: [MatButtonModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrl: './delete-confirmation-dialog.component.css'
})
export class DeleteConfirmationDialogComponent {
  confirmationMessage: string;
  action: string;

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, action: string }
  ) {
    // Setup message and action based on passed data
    this.confirmationMessage = data?.message || 'Are you sure you want to delete this item?';
    this.action = data?.action || 'Delete';
  }

  onConfirm(): void {
    this.dialogRef.close(true);  // Close dialog and return true for confirmation
  }

  onCancel(): void {
    this.dialogRef.close(false);  // Close dialog and return false for cancellation
  }
}