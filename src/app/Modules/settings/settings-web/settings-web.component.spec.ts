import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsWebComponent } from './settings-web.component';

describe('SettingsWebComponent', () => {
  let component: SettingsWebComponent;
  let fixture: ComponentFixture<SettingsWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SettingsWebComponent]
    });
    fixture = TestBed.createComponent(SettingsWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
