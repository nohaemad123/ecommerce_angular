import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSettingComponent } from './NavSettingComponent';

describe('NavSettingComponent', () => {
  let component: NavSettingComponent;
  let fixture: ComponentFixture<NavSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavSettingComponent]
    });
    fixture = TestBed.createComponent(NavSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
