import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilBarComponent } from './profil-bar.component';

describe('ProfilBarComponent', () => {
  let component: ProfilBarComponent;
  let fixture: ComponentFixture<ProfilBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
