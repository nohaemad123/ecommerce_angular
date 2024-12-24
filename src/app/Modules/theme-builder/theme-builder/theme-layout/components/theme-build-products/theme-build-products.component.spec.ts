import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeBuildProductsComponent } from './theme-build-products.component';

describe('ThemeBuildProductsComponent', () => {
  let component: ThemeBuildProductsComponent;
  let fixture: ComponentFixture<ThemeBuildProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ThemeBuildProductsComponent]
    });
    fixture = TestBed.createComponent(ThemeBuildProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
