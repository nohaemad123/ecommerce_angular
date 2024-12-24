import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeBuilderService } from 'src/app/Data/services/themebuilder.service';

@Component({
  selector: 'app-theme-layout',
  standalone: false,
  templateUrl: './theme-layout.component.html',
  styleUrls: ['./theme-layout.component.scss']
})
export class ThemeLayoutComponent {

  _themeBuilderService = inject(ThemeBuilderService);


  showNavSettings$ = this._themeBuilderService.showNavSettings$.asObservable();
  currentNavSettings$ = this._themeBuilderService.currentPageDetails$.asObservable();


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._themeBuilderService.showNavSettings$.next(false);

  }
}
