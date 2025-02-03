import { TestBed } from '@angular/core/testing';

import ValidationErrorHandlingService from './validation-error-handling.service';

describe('ValidationErrorHandlingService', () => {
  let service: ValidationErrorHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationErrorHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
