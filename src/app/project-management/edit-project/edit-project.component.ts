import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../projects/projects.component';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-project',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css'
})
export class EditProjectComponent implements OnInit{
  projectForm: FormGroup;
  projectId!: number; 

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['Not Started', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['id']; // Get the project ID from the route
      this.loadProject();
    });
  }
  loadProject(): void {
    this.projectService.getProjectById(this.projectId).subscribe(project => {
      if (project) {
        this.projectForm.patchValue(project); // Pre-fill the form with the project data
      }
    });
  }

  editProject(): void {
    if (this.projectForm.valid) {
      const updatedProject = this.projectForm.value;
      updatedProject.id = this.projectId; // Ensure the ID stays the same
      this.projectService.editProject(updatedProject).subscribe({
        next: () => this.router.navigate(['/project-management/projects']),
        error: () => alert('Failed to update project'),
      });
    }
  }
}
