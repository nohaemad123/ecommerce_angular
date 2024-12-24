import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMarketingFormComponent } from './product-marketing-form.component';

describe('ProductMarketingFormComponent', () => {
  let component: ProductMarketingFormComponent;
  let fixture: ComponentFixture<ProductMarketingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductMarketingFormComponent]
    });
    fixture = TestBed.createComponent(ProductMarketingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
