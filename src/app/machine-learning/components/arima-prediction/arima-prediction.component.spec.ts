import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArimaPredictionComponent } from './arima-prediction.component';

describe('ArimaPredictionComponent', () => {
  
  let component: ArimaPredictionComponent;
  let fixture: ComponentFixture<ArimaPredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArimaPredictionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArimaPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
