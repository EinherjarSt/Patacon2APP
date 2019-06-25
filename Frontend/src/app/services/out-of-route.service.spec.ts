import { TestBed } from '@angular/core/testing';

import { OutOfRouteService } from './out-of-route.service';

describe('OutOfRouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OutOfRouteService = TestBed.get(OutOfRouteService);
    expect(service).toBeTruthy();
  });
});
