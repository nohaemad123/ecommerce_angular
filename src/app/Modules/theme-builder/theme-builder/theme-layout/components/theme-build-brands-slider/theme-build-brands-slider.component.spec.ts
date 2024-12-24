import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeBuildBrandsSliderComponent } from './theme-build-brands-slider.component';

describe('ThemeBuildBrandsSliderComponent', () => {
  let component: ThemeBuildBrandsSliderComponent;
  let fixture: ComponentFixture<ThemeBuildBrandsSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ThemeBuildBrandsSliderComponent]
    });
    fixture = TestBed.createComponent(ThemeBuildBrandsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
