import { Component, OnInit, inject, model, signal } from '@angular/core';
import { RouterModule } from '@angular/router';  
import { Task } from '../interface/task';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';  // Import MatDialogModule
// import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [RouterModule,CommonModule,
    MatDialogModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})

export class LandingPageComponent implements OnInit {

   taskList: Task[] = []
   constructor(){
     
   }

  updatedTask?:Task;

  ngOnInit(): void {
   this.taskList =  [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
    { id: 3, title: 'Task 3', completed: false },
    { id: 4, title: 'Task 4', completed: true },
    { id: 5, title: 'Task 5', completed: false },
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
    { id: 3, title: 'Task 3', completed: false },
    { id: 4, title: 'Task 4', completed: true }
  ];
  }

  
  onTaskUpdated(task: Task){
     this.updatedTask = task;
     console.log("test");
  }
  // openDialog(): void {
  //   this.dialog.open(AddEditTaskComponent);  // Open the dialog
  // }
   
  
}
