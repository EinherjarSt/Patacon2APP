import { TestBed } from '@angular/core/testing';

import { ProducerviewService } from './producerview.service';

describe('ProducerviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProducerviewService = TestBed.get(ProducerviewService);
    expect(service).toBeTruthy();
  });
});
