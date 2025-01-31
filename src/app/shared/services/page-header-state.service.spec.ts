import { TestBed } from '@angular/core/testing';

import { PageHeaderStateService } from './page-header-state.service';

describe('PageHeaderStateService', () => {
  let service: PageHeaderStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageHeaderStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
