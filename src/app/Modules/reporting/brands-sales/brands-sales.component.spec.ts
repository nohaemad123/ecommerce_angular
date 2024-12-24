import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsSalesComponent } from './brands-sales.component';

describe('BrandsSalesComponent', () => {
  let component: BrandsSalesComponent;
  let fixture: ComponentFixture<BrandsSalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrandsSalesComponent]
    });
    fixture = TestBed.createComponent(BrandsSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
