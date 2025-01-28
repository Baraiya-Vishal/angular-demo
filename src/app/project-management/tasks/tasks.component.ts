import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Task {
  id: number;
  title: string;
  assignedTo: string;
  dueDate: string;
  status: string;
}

@Component({
  selector: 'app-tasks',
  imports: [RouterModule,CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  constructor() { }

  ngOnInit(): void {
    // Mock data for tasks
    this.tasks = [
      { id: 1, title: 'Task A', assignedTo: 'John Doe', dueDate: '2025-01-10', status: 'In Progress' },
      { id: 2, title: 'Task B', assignedTo: 'Jane Smith', dueDate: '2025-01-12', status: 'Completed' },
      { id: 3, title: 'Task C', assignedTo: 'Michael Lee', dueDate: '2025-01-15', status: 'Not Started' }
    ];
  }

}
