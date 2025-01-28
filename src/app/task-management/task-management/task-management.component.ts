import { Component } from '@angular/core';
import { Task } from '../../interface/task';
import { TaskListComponent } from '../task-list/task-list.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-task-management',
  imports: [TaskListComponent,CommonModule,MatCardModule],
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.css'
})
export class TaskManagementComponent {

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
}
