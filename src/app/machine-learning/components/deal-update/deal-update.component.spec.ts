import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealUpdateComponent } from './deal-update.component';

describe('DealUpdateComponent', () => {
  let component: DealUpdateComponent;
  let fixture: ComponentFixture<DealUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
