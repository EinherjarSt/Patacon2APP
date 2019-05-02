import { TestBed } from '@angular/core/testing';

import { DispatchesService } from './dispatches.service'

describe('DispatchesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DispatchesService = TestBed.get(DispatchesService);
    expect(service).toBeTruthy();
  });
});
