import { TestBed } from '@angular/core/testing';

import { VlogService } from './vlog.service';

describe('VlogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VlogService = TestBed.get(VlogService);
    expect(service).toBeTruthy();
  });
});
