import { TestBed } from '@angular/core/testing';

import { BeginSubscriptionService } from './begin-subscription.service';

describe('BeginSubscriptionService', () => {
  let service: BeginSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeginSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
