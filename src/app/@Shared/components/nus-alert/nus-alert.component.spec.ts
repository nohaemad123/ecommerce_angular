import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NusAlertComponent } from './nus-alert.component';

describe('NusAlertComponent', () => {
  let component: NusAlertComponent;
  let fixture: ComponentFixture<NusAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NusAlertComponent]
    });
    fixture = TestBed.createComponent(NusAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
