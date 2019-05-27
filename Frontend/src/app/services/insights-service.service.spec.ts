import { TestBed } from '@angular/core/testing';

import { InsightsServiceService } from './insights-service.service';

describe('InsightsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsightsServiceService = TestBed.get(InsightsServiceService);
    expect(service).toBeTruthy();
  });
});
