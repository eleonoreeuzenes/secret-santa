import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealAssignmentComponent } from './reveal-assignment.component';

describe('RevealAssignmentComponent', () => {
  let component: RevealAssignmentComponent;
  let fixture: ComponentFixture<RevealAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevealAssignmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevealAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
