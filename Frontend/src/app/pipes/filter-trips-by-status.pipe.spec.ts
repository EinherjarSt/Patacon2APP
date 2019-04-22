import { FilterTripsByStatusPipe } from './filter-trips-by-status.pipe';

describe('FilterTripsByStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterTripsByStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
