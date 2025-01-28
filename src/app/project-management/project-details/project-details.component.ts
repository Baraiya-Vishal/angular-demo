import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../projects/projects.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-details',
  imports: [RouterModule,CommonModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})

export class ProjectDetailsComponent implements OnInit {

  project: Project | undefined;

  constructor(private ProjectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.ProjectService.getProjectById(projectId).subscribe(
      (project) => this.project = project
    );
  }

}
