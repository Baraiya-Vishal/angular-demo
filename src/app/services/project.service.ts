import { Injectable } from '@angular/core';
import { Project } from '../project-management/projects/projects.component';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  private projects: Project[] = [
    { id: 1, name: 'Project A', description: 'Description for Project A', status: 'In Progress' },
    { id: 2, name: 'Project B', description: 'Description for Project B', status: 'Completed' },
  ];


  getProjects(): Observable<Project[]> {
    return of(this.projects);
  }

  // Get a project by ID
  getProjectById(id: number): Observable<Project | undefined> {
    const project = this.projects.find(p => p.id === id);
    return of(project);
  }

  // Optional: Set projects if you're fetching data from an external API
  setProjects(projects: Project[]): void {
    this.projects = projects;
  }

  addProject(newProject: Project): Observable<Project> {
    newProject.id = this.projects.length ? this.projects[this.projects.length - 1].id + 1 : 1;
    this.projects.push(newProject);
    return of(newProject);
  }
  
  editProject(updatedProject: Project): Observable<Project> {
    const index = this.projects.findIndex(p => p.id === updatedProject.id);
    if (index !== -1) {
      this.projects[index] = updatedProject;
    }
    return of(updatedProject);
  }

  // Delete a project
  deleteProject(id: number): Observable<boolean> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index !== -1) {
      this.projects.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
