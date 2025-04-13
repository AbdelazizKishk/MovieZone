import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoivesComponent } from './moives.component';

describe('MoivesComponent', () => {
  let component: MoivesComponent;
  let fixture: ComponentFixture<MoivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoivesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
