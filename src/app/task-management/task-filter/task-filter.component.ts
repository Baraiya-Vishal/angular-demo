import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TaskFilter } from '../../interface/task-filter';
import { Task } from '../../interface/task';
import { TaskListComponent } from '../task-list/task-list.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-task-filter',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule, MatSelectModule,CommonModule],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.css'
})

export class TaskFilterComponent  {
  @Input() taskList!: Task[];
  // filteredTaskList: Task[] = [];
  // @Input() tasfilter! : TaskFilter;
  taskFilter: TaskFilter = {
    title: '',
    completed: true, 
    status:''
  };

  @Output() filteredTaskList = new EventEmitter<Task[]>();

  filterTasks(): void {
    console.log(this.taskFilter);
    this.filteredTaskList.emit(
      this.taskList.filter(task =>
        (this.taskFilter.title ? task.title.toLowerCase().includes(this.taskFilter.title.toLowerCase()) : true) &&
        this.filterByStatus(task, this.taskFilter.status)
      )
    );
  }
  
  filterByStatus(task: Task, status: string): boolean {
    console.log(`Checking task ${task.title} with status ${status}`);
    if (status === 'Completed') {
      return task.completed === true;
    } else if (status === 'Pending') {
      return task.completed === false;
    }
    return true; // If status is "All" or empty, return all tasks
  }

  clearFilters(): void {
    this.taskFilter.title = '';  // Reset task title
    this.taskFilter.status = '';  // Reset status
    this.filterTasks();  // Trigger the filtering method
  }
  

}
