import { TestBed } from '@angular/core/testing';

import { RequestSigningService } from './request-signing.service';

describe('RequestSigningService', () => {
  let service: RequestSigningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestSigningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
