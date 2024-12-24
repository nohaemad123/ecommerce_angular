import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSaleComponent } from './products-sale.component';

describe('ProductsSaleComponent', () => {
  let component: ProductsSaleComponent;
  let fixture: ComponentFixture<ProductsSaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductsSaleComponent]
    });
    fixture = TestBed.createComponent(ProductsSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
