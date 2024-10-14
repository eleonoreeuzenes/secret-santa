import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSecretSantaComponent } from './create-secret-santa.component';

describe('MultiStepFormComponent', () => {
  let component: CreateSecretSantaComponent;
  let fixture: ComponentFixture<CreateSecretSantaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSecretSantaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSecretSantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
