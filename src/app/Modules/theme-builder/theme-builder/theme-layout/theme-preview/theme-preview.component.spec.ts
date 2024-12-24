import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemePreviewComponent } from './theme-preview.component';

describe('ThemePreviewComponent', () => {
  let component: ThemePreviewComponent;
  let fixture: ComponentFixture<ThemePreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ThemePreviewComponent]
    });
    fixture = TestBed.createComponent(ThemePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
