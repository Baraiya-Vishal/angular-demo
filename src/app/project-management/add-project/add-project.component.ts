import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent implements OnInit{

  projectForm: FormGroup;

  constructor(private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['Not Started', Validators.required],
    });
  }

  ngOnInit(): void {}

  addProject(): void {
    if (this.projectForm.valid) {
      const newProject = this.projectForm.value;
      this.projectService.addProject(newProject).subscribe({
        next: (project) => {
          this.router.navigate(['/project-management/projects']); // Navigate to the projects list
        },
        error: () => alert('Failed to add project'),
      });
    }
  }
}
