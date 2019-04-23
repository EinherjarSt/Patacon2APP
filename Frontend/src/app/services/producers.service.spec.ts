import { TestBed } from '@angular/core/testing';

import { ProducersService } from './producers.service';

describe('ProducersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProducersService = TestBed.get(ProducersService);
    expect(service).toBeTruthy();
  });
});
