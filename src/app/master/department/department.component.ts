// src/app/department/department.component.ts
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { DepartmentService } from '../services/department.service';
import { Department } from '../../models/department.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // For notifications
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentDialogComponent } from '../department-dialog/department-dialog.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonConfig } from '../../interface/ButtonConfig';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';
import { PageHeaderStateService } from '../../shared/services/page-header-state.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PaginationComponent } from "../../shared/components/pagination/pagination.component";
import { FilterConfig } from '../../interface/FilterConfig';
import { FilterComponent } from "../../shared/components/filter/filter.component";
import { MatSort } from '@angular/material/sort';
import { DeleteConfirmationDialogComponent } from '../../shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  imports: [MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    MatIcon,
    CommonModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    PaginationComponent,
    FilterComponent,
    MatSort,
  ],
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  currentFilters: any;
  filterConfig: FilterConfig[] = [];
  displayedColumns: string[] = ['isActive', 'Name', 'actions'];
  dataSource = new MatTableDataSource<Department>();
  totalRecords = 2;
  pageSize = 10;
  pageIndex = 1;
  sortBy = '';
  isAscending = true;
  isActive = '';
  name = '';
  orderBy = true;
  serverValidationErrors: { [key: string]: string } = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  departments: Department[] = [];
  selectedDepartment: Department | null = null;
  constructor(
    private departmentService: DepartmentService,
    private pageHeaderStateService: PageHeaderStateService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {


    this.filterConfig = [
      { field: 'name', label: 'Department Name', type: 'text', triggerOnChange: true },
      { field: 'active', label: 'Active', type: 'select', triggerOnChange: true, options: ['All', 'true', 'false'] }
    ];

    this.loadDepartments();
    const title = 'Department Management';
    const buttons: ButtonConfig[] = [
      {
        label: 'Create Department',
        color: 'primary',
        icon: 'add',
        visible: true,
        click: new EventEmitter<void>()  // Emit click event
      }
    ];

    buttons[0].click.subscribe(() => this.openDialog(null));
    // Update the header using the service
    this.pageHeaderStateService.updateTitle(title);
    this.pageHeaderStateService.updateButtons(buttons);



  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;  // Make sure the sort is linked to the table
  }


  onFilterChanged(filters: any): void {

    if (filters?.active === 'All') {
      this.isActive = "";  // For All, we don't filter by 'isActive'
    } else {
      this.isActive = filters?.active;  // For Active, filter departments that are active
    }

    this.name = filters?.name;
    this.pageIndex = 1;
    this.loadDepartments();
  }


  openDialog(department: Department | null): void {
    const dialogRef = this.dialog.open(DepartmentDialogComponent, {
      width: '400px',
      data: department
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.updateDepartment(result);  // Update department
        } else {
          this.createDepartment(result.name, result.isActive); // Create department
        }
      }
    });
  }


  onIsActiveChange(department: Department): void {
    // Here you can update the department's 'isActive' property in your backend
    const previousIsActive = !department.isActive;  // Store previous value to rollback in case of failure

    this.departmentService.updateStatusDepartment(department).subscribe({
      next: (data) => {
        this.snackBar.open('Department status updated successfully', 'Close', { duration: 3000 });
        // handle success
        this.loadDepartments();
      },
      error: (error) => {
        // handle error
        department.isActive = previousIsActive;
        this.snackBar.open('Error changing status of department', 'Close', { duration: 3000 });
      }
    });
  }


  loadDepartments(): void {
    this.departmentService.getDepartments(this.pageIndex,
      this.pageSize,
      this.sortBy,
      this.isAscending,
      this.isActive,
      this.name,
      this.orderBy).subscribe({
        next: (data) => {
          this.departments = data.result.map((item: any) => ({
            id: item.departmentId,   // mapping to match the interface
            name: item.name,
            isActive: item.isActive,
          }));
          console.log(data);
          this.totalRecords = data.totalRecords;
        },
        error: (error) => {
          this.snackBar.open('Error loading departments', 'Close', { duration: 3000 });
        }
      });
  }

  createDepartment(name: string, isActive: boolean): void {
    const newDepartment: Department = { id: 0, name, isActive };

    this.departmentService.createDepartment(newDepartment).subscribe({
      next: (data) => {
        this.serverValidationErrors = {};
        this.departments.push(data);
        this.loadDepartments();
        this.snackBar.open('Department created successfully', 'Close', { duration: 3000 });
      },
      error: (error) => {
        if (error.type === 'validation') {
          this.serverValidationErrors = error.errors; // Bind validation errors
        } else {
          this.snackBar.open(error.message, 'Close', { duration: 3000 }); // Show error message
        }
        // this.snackBar.open('Error creating department', 'Close', { duration: 3000 });
      }
    });
  }

  getErrorMessage(field: string): string {
    return this.serverValidationErrors[field] || ''; // Bind errors dynamically
  }


  editDepartment(department: Department): void {
    this.selectedDepartment = { ...department }; // Copy to edit
  }

  updateDepartment(department: Department): void {
    this.departmentService.updateDepartment(department).subscribe({
      next: (data) => {
          this.loadDepartments();
          this.snackBar.open('Department updated successfully', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Error updating department', 'Close', { duration: 3000 });
      }
    });
  }


  onDelete(id: number, department: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: {
        message: `Are you sure you want to delete the <strong> ${department} </strong> department? This action cannot be undone.`,
        action: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Proceed with deletion
        this.deleteDepartment(id);
      } else {
        // Do nothing or handle cancellation
        console.log('Delete action canceled');
      }
    });
  }


  deleteDepartment(id: number): void {
    this.departmentService.deleteDepartment(id).subscribe({
      next: () => {
        this.loadDepartments();
        this.snackBar.open('Department deleted successfully', 'Close', { duration: 3000 });
      },
      error: (error) => {
        this.snackBar.open('Error deleting department', 'Close', { duration: 3000 });
      }
    });
  }

  // onPageChange(event: any) {
  //   console.log(this.totalRecords);
  //   this.pageIndex = event.pageIndex + 1;
  //   this.pageSize = event.pageSize;
  //   this.loadDepartments();
  // }

  // Handle sort change event from mat-sort
  onSortChange(event: any) {
    if (event.direction) {
      this.sortBy = event.active;
    } else {
      this.sortBy = "";
    }
    this.isAscending = event.direction === 'asc';  // true for 'asc', false for 'desc'
    console.log("sort owrk");
    console.log(event.direction);
    this.loadDepartments();  // Fetch sorted data from the backend
  }


  onPageChange(event: { pageIndex: number, pageSize: number }): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadDepartments();
  }

}
