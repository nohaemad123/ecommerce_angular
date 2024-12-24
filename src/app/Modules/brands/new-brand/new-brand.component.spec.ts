import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBrandComponent } from './new-brand.component';

describe('NewBrandComponent', () => {
  let component: NewBrandComponent;
  let fixture: ComponentFixture<NewBrandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewBrandComponent]
    });
    fixture = TestBed.createComponent(NewBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
