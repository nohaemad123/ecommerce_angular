import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCouponsComponent } from './new-coupons.component';

describe('NewCouponsComponent', () => {
  let component: NewCouponsComponent;
  let fixture: ComponentFixture<NewCouponsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewCouponsComponent]
    });
    fixture = TestBed.createComponent(NewCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
