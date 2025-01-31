import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Department } from '../../models/department.model';
import { RequestService } from '../../core/request.service';
import { environment } from '../../../environments/environment';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})

export class DepartmentService {
  private apiUrl = '/departments'; // Base endpoint, no need to repeat the full API URL

  private getAllUrl = environment.departmentGetAll;
  private createUrl = environment.departmentCreate;
  private editUrl = environment.departmentEdit;
  private updateStatusUrl = environment.departmentStatusUpdate;
  private deleteUrl = environment.departmentDelet;
  constructor(private requestService: RequestService) { }

  // Get all departments
  getDepartments(pageNumber: number, pageSize: number, sortBy: string, isAscending: boolean, isActive: string, name: string, orderBy: boolean): Observable<{ result: Department[], totalRecords: number }> {
    return this.requestService.request<{ result: Department[] , totalRecord :number }>('POST', this.getAllUrl, {
      body: { 
        pageSize,
        pageNumber,
        sortBy,
        isAscending,
        isActive,
        name,
        orderBy
      }
    }).pipe(
     
      map(response => ({
        result: response.result,  // Extract departments only
        totalRecords: response.totalRecord  // Extract totalRecords only
      }))
       // Extract the 'result' array from the response
    );
  }

  // Get a specific department by id
  getDepartment(id: number): Observable<Department> {
    return this.requestService.request<Department>('GET', `${this.apiUrl}/${id}`);
  }

  // Create a new department
  createDepartment(department: Department): Observable<Department> {
    return this.requestService.request<Department>('POST', this.createUrl, {
      body: department,
    });
  }

  // Update an existing department
  updateDepartment(department: Department): Observable<Department> {
    return this.requestService.request<Department>('PUT', `${this.editUrl}/${department.id}`, {
      body: {departmentId:department.id,
            name:department.name,
            isActive:department.isActive
          },
    });
  }

  // Update an existing department
  updateStatusDepartment(department: Department): Observable<Department> {
    return this.requestService.request<Department>('POST', `${this.updateStatusUrl}/${department.id}?IsActive=${department.isActive}`);
  }

  // Delete a department
  deleteDepartment(id: number): Observable<void> {
    return this.requestService.request<void>('DELETE', `${this.deleteUrl}?id=${id}`);
  }

}
