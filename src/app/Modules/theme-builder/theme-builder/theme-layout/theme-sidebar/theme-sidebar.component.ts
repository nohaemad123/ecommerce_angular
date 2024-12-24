import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeBuilderService } from 'src/app/Data/services/themebuilder.service';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, EMPTY, catchError, map } from 'rxjs';

@Component({
  selector: 'theme-sidebar',
  standalone: false,
  templateUrl: './theme-sidebar.component.html',
  styleUrls: ['./theme-sidebar.component.scss']
})
export class ThemeSidebarComponent {

  _themeBuilderService = inject(ThemeBuilderService);
  _translateService = inject(TranslocoService);


  showError: boolean = false;
  currentLang = this._translateService.langChanges$;


  pageList$ = new BehaviorSubject<any[]>([]);


  ngOnInit(): void {
   this.getAllPages()
  }

  getAllPages(){

    // Fetch pages from the theme builder service and update the pageList$
    this._themeBuilderService.getAllPages().pipe(
      catchError((error) => {
        this.showError = true;
        return EMPTY;
      })
    ).subscribe(
      pages => {
        // Update the value of pageList$ with the received pages
        this.pageList$.next(pages);
      }
    );
  }

  addNewPage(): void {
    let random = this.pageList$.value?.length +1
    let page = {
      title: "صفحة جديدة " + random,
      titleEn: "New page " + random,
      pageIcon: "file",
      nameURL: "page-" + random,
      active: false,
      canBeDeleted: false,
      canBeModified: true
    };
    this.pageList$.next([...this.pageList$.value,page]);

  }
  deletePage(page:any){
      console.log(page);
    this._themeBuilderService.deletePage(page.id).subscribe(res => {
      if(res){
        this.getAllPages()
      }
    })
  }

  pageConfig(page:any):void{
    this._themeBuilderService.currentPageDetails$.next(page);
    this._themeBuilderService.showNavSettings$.next(true);
  }
}
