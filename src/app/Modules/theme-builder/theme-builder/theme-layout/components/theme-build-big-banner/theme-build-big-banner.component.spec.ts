import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeBuildBigBannerComponent } from './theme-build-big-banner.component';

describe('ThemeBuildBigBannerComponent', () => {
  let component: ThemeBuildBigBannerComponent;
  let fixture: ComponentFixture<ThemeBuildBigBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ThemeBuildBigBannerComponent]
    });
    fixture = TestBed.createComponent(ThemeBuildBigBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
