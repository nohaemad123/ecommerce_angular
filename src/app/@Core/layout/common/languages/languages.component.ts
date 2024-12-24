import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [CommonModule,TranslocoModule],
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent {

  translocoService = inject(TranslocoService)
  currentLang = this.translocoService.langChanges$;

  switchLanguage() {
    const currentLang = this.translocoService.getActiveLang();
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    this.translocoService.setActiveLang(newLang);
    // this.currentLang = newLang
  }

  ngOnInit(): void {

    this.translocoService.langChanges$.subscribe(langChanges => {
       // Set the language for the HTML element
       document.documentElement.lang = langChanges;
       // Set class for the body element
      document.body.classList.toggle('rtl', langChanges === 'ar');
      document.body.classList.toggle('ltr', langChanges !== 'ar');
      // Set att for the html element
      document.documentElement.setAttribute('dir', langChanges === 'ar' ? 'rtl' : 'ltr');

    });
  }
}
