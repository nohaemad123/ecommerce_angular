import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService } from '@ngneat/transloco';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ENDPOINT } from 'src/app/Data/services/endpoint/endpoint';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private translocoService: TranslocoService) {}
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    nav: false,
    items:2,
  }
  FOLDERNAME = ENDPOINT.GENERAL.FOLDER_NAME.CATEGORY

  switchLanguage(): void {
    const currentLang = this.translocoService.getActiveLang();
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    this.translocoService.setActiveLang(newLang);
  }

  onUpload(event: string){
    console.log(event);

  }
}
