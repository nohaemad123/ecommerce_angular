import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesSalesComponent } from './cities-sales.component';

describe('CitiesSalesComponent', () => {
  let component: CitiesSalesComponent;
  let fixture: ComponentFixture<CitiesSalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CitiesSalesComponent]
    });
    fixture = TestBed.createComponent(CitiesSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
