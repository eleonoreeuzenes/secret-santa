import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmParticipantComponent } from './confirm-participant.component';

describe('ConfirmParticipantComponent', () => {
  let component: ConfirmParticipantComponent;
  let fixture: ComponentFixture<ConfirmParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmParticipantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
