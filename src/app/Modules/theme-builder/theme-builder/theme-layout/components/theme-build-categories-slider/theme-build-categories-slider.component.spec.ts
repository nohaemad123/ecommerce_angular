import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeBuildCategoriesSliderComponent } from './theme-build-categories-slider.component';

describe('ThemeBuildCategoriesSliderComponent', () => {
  let component: ThemeBuildCategoriesSliderComponent;
  let fixture: ComponentFixture<ThemeBuildCategoriesSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ThemeBuildCategoriesSliderComponent]
    });
    fixture = TestBed.createComponent(ThemeBuildCategoriesSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
