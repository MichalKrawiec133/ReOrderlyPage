import { TestBed } from '@angular/core/testing';

import { SubscriptionDataService } from './subscription-data.service';

describe('SubscriptionDataService', () => {
  let service: SubscriptionDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
