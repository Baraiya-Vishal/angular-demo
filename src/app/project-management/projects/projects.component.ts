import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';

export class Project {
  id: number;
  name: string;
  description: string;
  status: string;

  constructor(id: number = 0 , name: string = '', description: string = '', status: string = '') {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
  }
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})

export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    // Mock data for projects
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }
  deleteProject(id: number): void {
    this.projectService.deleteProject(id).subscribe((success) => {
      if (success) {
        alert('project deleted successfully');
      } else {
        alert('Failed to delete project');
      }
    });
  }


}
