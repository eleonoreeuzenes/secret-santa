import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeSecretSantaComponent } from './see-secret-santa.component';

describe('SeeSecretSantaComponent', () => {
  let component: SeeSecretSantaComponent;
  let fixture: ComponentFixture<SeeSecretSantaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeSecretSantaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeSecretSantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
