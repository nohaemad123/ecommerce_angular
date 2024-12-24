import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslocoService } from '@ngneat/transloco';
import { LanguagesComponent } from '@Core/layout/common/languages/languages.component';

@Component({
  selector: 'slider-auth',
  standalone: true,
  imports: [CommonModule,CarouselModule,LanguagesComponent],
  templateUrl: './slider-auth.component.html',
  styleUrls: ['./slider-auth.component.scss']
})
export class SliderAuthComponent {

  translocoService = inject(TranslocoService);


  currentLang = 'en';
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay:false,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    nav: false,
    items:1,
    responsive: {
      1024: {
        items: 1
      }
    }
  }

  switchLanguage() {
    const currentLang = this.translocoService.getActiveLang();
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    this.translocoService.setActiveLang(newLang);
    this.currentLang = newLang
  }
}
