import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesSalesComponent } from './categories-sales.component';

describe('CategoriesSalesComponent', () => {
  let component: CategoriesSalesComponent;
  let fixture: ComponentFixture<CategoriesSalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CategoriesSalesComponent]
    });
    fixture = TestBed.createComponent(CategoriesSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
