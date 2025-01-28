import { Component, EventEmitter, Input, OnInit, Output, ViewChild, inject, model, signal } from '@angular/core';
import { Task } from '../../interface/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { log } from 'console';
import { MatDialog } from '@angular/material/dialog';
import { AddEditTaskComponent } from '../add-edit-task/add-edit-task.component';
import { MatButton } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskFilterComponent } from '../task-filter/task-filter.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray,CdkDragPlaceholder} from '@angular/cdk/drag-drop';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule, MatButton,MatDialogModule, TaskFilterComponent,MatTableModule,MatPaginatorModule,MatSortModule,MatCardModule,CdkDropList,CdkDragPlaceholder,CdkDrag],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})

export class TaskListComponent implements OnInit {


  constructor(public dialog: MatDialog , private cdr: ChangeDetectorRef){}
  @ViewChild(TaskFilterComponent) taskFilterComponent!: TaskFilterComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() taskList!: Task[];
  @Input() isTableView: boolean = true;
  @Output() taskUpdated = new EventEmitter<Task>();
  filteredTaskList: Task[] = [];
  displayedColumns: string[] = ['id', 'title', 'completed','actions'];
  // dataSource = this.filteredTaskList;
  dataSource = new MatTableDataSource<Task>();

  ngOnInit(): void {
   this.filteredTaskList = [...this.taskList]
   this.dataSource.data = [...this.taskList];
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  taskClicked(task: Task): void {
    console.log('Received updated task:', task);
    this.taskUpdated.emit(task);  // Emit the task to the parent component
    console.log(task);  // Log the updated task for debugging
  }


  readonly animal = signal('');
  readonly name = model('');
  // readonly dialog = inject(MatDialog);

  openDialog(task: Task): void {
    const dialogRef = this.dialog.open(AddEditTaskComponent, {
      data: task,
      height: 'auto',
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
      console.log(result);

        this.onTaskUpdated(result);
      }
    });
  }

  onTaskUpdated(updatedTask: Task) {

    const index = this.taskList.findIndex(task => task.id === updatedTask.id);

    if (index !== -1) {
      // Update task properties
      this.taskList[index] = updatedTask;
      // this.filteredTaskList = this.taskList;
      this.taskFilterComponent.filterTasks();

      // Optionally, trigger any event or update logic if needed
      console.log('Task updated:', updatedTask);
    } else {
      console.log('Task not found');
    }
  }

  onTaskFilter(filterTasks: Task[]){
   this.filteredTaskList = filterTasks;
   this.dataSource.data = filterTasks;
  }


  tableBoundary = '.mat-elevation-z8';  // Table boundary
  cardContainerBoundary = '.card-container'; // Card container boundary

  drop(event: CdkDragDrop<Task[]>): void {
    // Move the item within the array
    moveItemInArray(this.filteredTaskList, event.previousIndex, event.currentIndex);
    this.dataSource.data = [...this.filteredTaskList];
  }


}
