import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSidebarComponent } from './theme-sidebar.component';

describe('ThemeSidebarComponent', () => {
  let component: ThemeSidebarComponent;
  let fixture: ComponentFixture<ThemeSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ThemeSidebarComponent]
    });
    fixture = TestBed.createComponent(ThemeSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
