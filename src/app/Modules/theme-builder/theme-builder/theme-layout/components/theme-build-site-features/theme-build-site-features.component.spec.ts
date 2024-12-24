import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeBuildSiteFeaturesComponent } from './theme-build-site-features.component';

describe('ThemeBuildSiteFeaturesComponent', () => {
  let component: ThemeBuildSiteFeaturesComponent;
  let fixture: ComponentFixture<ThemeBuildSiteFeaturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ThemeBuildSiteFeaturesComponent]
    });
    fixture = TestBed.createComponent(ThemeBuildSiteFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
