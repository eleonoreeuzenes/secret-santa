import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareSecretSantaComponent } from './share-secret-santa.component';

describe('ShareSecretSantaComponent', () => {
  let component: ShareSecretSantaComponent;
  let fixture: ComponentFixture<ShareSecretSantaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareSecretSantaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareSecretSantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
