import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginSubscriptionComponent } from './begin-subscription.component';

describe('BeginSubscriptionComponent', () => {
  let component: BeginSubscriptionComponent;
  let fixture: ComponentFixture<BeginSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeginSubscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeginSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
