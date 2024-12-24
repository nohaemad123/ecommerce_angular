import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSeoFormComponent } from './product-seo-form.component';

describe('ProductSeoFormComponent', () => {
  let component: ProductSeoFormComponent;
  let fixture: ComponentFixture<ProductSeoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductSeoFormComponent]
    });
    fixture = TestBed.createComponent(ProductSeoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
