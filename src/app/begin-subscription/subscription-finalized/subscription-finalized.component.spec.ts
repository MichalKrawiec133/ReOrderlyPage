import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionFinalizedComponent } from './subscription-finalized.component';

describe('SubscriptionFinalizedComponent', () => {
  let component: SubscriptionFinalizedComponent;
  let fixture: ComponentFixture<SubscriptionFinalizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionFinalizedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionFinalizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
