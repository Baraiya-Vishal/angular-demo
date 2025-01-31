import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTechnologyComponent } from './project-technology.component';

describe('ProjectTechnologyComponent', () => {
  let component: ProjectTechnologyComponent;
  let fixture: ComponentFixture<ProjectTechnologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTechnologyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
