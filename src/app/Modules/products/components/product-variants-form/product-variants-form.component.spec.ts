import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVariantsFormComponent } from './product-variants-form.component';

describe('ProductVariantsFormComponent', () => {
  let component: ProductVariantsFormComponent;
  let fixture: ComponentFixture<ProductVariantsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductVariantsFormComponent]
    });
    fixture = TestBed.createComponent(ProductVariantsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
