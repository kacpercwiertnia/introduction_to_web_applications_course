import { TestBed } from '@angular/core/testing';

import { ReadTripsService } from './read-trips.service';

describe('ReadTripsService', () => {
  let service: ReadTripsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadTripsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
