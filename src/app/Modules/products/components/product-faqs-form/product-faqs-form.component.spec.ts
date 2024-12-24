import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFaqsFormComponent } from './product-faqs-form.component';

describe('ProductFaqsFormComponent', () => {
  let component: ProductFaqsFormComponent;
  let fixture: ComponentFixture<ProductFaqsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductFaqsFormComponent]
    });
    fixture = TestBed.createComponent(ProductFaqsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
