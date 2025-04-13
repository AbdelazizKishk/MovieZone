import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalisTvComponent } from './detalis-tv.component';

describe('DetalisTvComponent', () => {
  let component: DetalisTvComponent;
  let fixture: ComponentFixture<DetalisTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalisTvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalisTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
