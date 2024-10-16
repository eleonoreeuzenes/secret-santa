import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeSecretSantaHeaderComponent } from './see-secret-santa-header.component';

describe('SeeSecretSantaHeaderComponent', () => {
  let component: SeeSecretSantaHeaderComponent;
  let fixture: ComponentFixture<SeeSecretSantaHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeSecretSantaHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeSecretSantaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
