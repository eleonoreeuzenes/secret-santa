import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSantaEventComponent } from './create-santa-event.component';

describe('MultiStepFormComponent', () => {
  let component: CreateSantaEventComponent;
  let fixture: ComponentFixture<CreateSantaEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSantaEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSantaEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
