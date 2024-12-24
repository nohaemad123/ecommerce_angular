import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderAuthComponent } from './slider-auth.component';

describe('SliderAuthComponent', () => {
  let component: SliderAuthComponent;
  let fixture: ComponentFixture<SliderAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SliderAuthComponent]
    });
    fixture = TestBed.createComponent(SliderAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
