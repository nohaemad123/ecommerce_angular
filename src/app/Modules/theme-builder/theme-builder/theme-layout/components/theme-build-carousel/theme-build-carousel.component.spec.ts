import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeBuildCarouselComponent } from './theme-build-carousel.component';

describe('ThemeBuildCarouselComponent', () => {
  let component: ThemeBuildCarouselComponent;
  let fixture: ComponentFixture<ThemeBuildCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ThemeBuildCarouselComponent]
    });
    fixture = TestBed.createComponent(ThemeBuildCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
