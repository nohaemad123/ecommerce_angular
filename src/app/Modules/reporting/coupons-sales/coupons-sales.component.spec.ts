import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsSalesComponent } from './coupons-sales.component';

describe('CouponsSalesComponent', () => {
  let component: CouponsSalesComponent;
  let fixture: ComponentFixture<CouponsSalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CouponsSalesComponent]
    });
    fixture = TestBed.createComponent(CouponsSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
