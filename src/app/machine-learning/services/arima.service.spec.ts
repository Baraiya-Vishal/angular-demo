import { TestBed } from '@angular/core/testing';

import { ArimaService } from './arima.service';

describe('ArimaService', () => {
  let service: ArimaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArimaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
