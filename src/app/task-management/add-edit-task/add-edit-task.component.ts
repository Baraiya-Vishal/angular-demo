import { Component, EventEmitter, Inject, Output, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../../interface/task';
import { MatCheckboxModule } from '@angular/material/checkbox';
export interface DialogData {
  animal: string;
  name: string;
}



@Component({
  selector: 'app-add-edit-task',
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatCheckboxModule,
    CommonModule],
  templateUrl: './add-edit-task.component.html',
  styleUrl: './add-edit-task.component.css'
})

export class AddEditTaskComponent {
  task: Task;
  errorMessage:string = ''
  constructor(
    public dialogRef: MatDialogRef<AddEditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    this.task = { ...data }; // Initialize the task with the passed data
  }
   
  onNoClick(): void {
    this.dialogRef.close();
  }


  cancel(): void {
    this.dialogRef.close();  // Close the dialog
  }

  save(): void {
    if (this.task.title.trim() === '') {
      this.errorMessage = 'Title is required!';
      return;
    }
  
    console.log('Saving task:', this.task);
    this.dialogRef.close(this.task);
  }
  
}
