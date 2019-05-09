import { TestBed } from '@angular/core/testing';

import { PlanificationService } from './planification.service';

describe('PlanificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanificationService = TestBed.get(PlanificationService);
    expect(service).toBeTruthy();
  });
});
