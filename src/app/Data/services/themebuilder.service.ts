import { Injectable, inject } from '@angular/core';
import { ENDPOINT } from './endpoint/endpoint';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ThemePage } from '../models/theme-builder/pages';

@Injectable({
  providedIn: 'root'
})
export class ThemeBuilderService {

  private ENDPOINT = ENDPOINT;
  private _http: HttpClient = inject(HttpClient);
  showNavSettings$ = new BehaviorSubject<boolean>(false);
  updateSectionData$ = new BehaviorSubject<boolean>(false);
  currentPageDetails$ = new BehaviorSubject<ThemePage|null>(null);
  currentSectionSelected$ = new BehaviorSubject<any>(null);

  constructor() { }

  getAllPages(): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.THEME_BUILDER.GET_ALL_PAGES)
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

  addPage(pageData: any): Observable<any> {
    return this._http.post(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.THEME_BUILDER.GET_ALL_PAGES, pageData)
              .pipe(
                map((response: any) => {
                  if (response.ok) {
                    return response.data;
                  }
                })
              );
  }

  getPageById(pageId: number): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.THEME_BUILDER.GET_ALL_PAGES + '/' + pageId)
              .pipe(
                map((response: any) => {
                  if (response.ok) {
                    return response.data;
                  }
                })
              );
  }

  updatePage(pageId: number, pageData: any): Observable<any> {
    return this._http.put(
      this.ENDPOINT.MAIN_HOST + this.ENDPOINT.THEME_BUILDER.UPDATE_ALL_PAGES + pageId,
           pageData
    ) .pipe(
      map((response: any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  deletePage(pageId: number){
    return this._http.delete(
      this.ENDPOINT.MAIN_HOST + this.ENDPOINT.THEME_BUILDER.UPDATE_ALL_PAGES + pageId) .pipe(
      map((response: any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  addSection(sectionData: any): Observable<any> {
    return this._http.post(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.THEME_BUILDER.ADD_SECTION, sectionData)
    .pipe(
      map((response: any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );;
  }

  deleteSection(sectionId: string){
    return this._http.delete(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.THEME_BUILDER.DELETE_SECTION + sectionId)
    .pipe(
      map((response: any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );;
  }

  updateSectionTypeTopCategory(reviewData: any): Observable<any> {
    return this._http.put(
      this.ENDPOINT.MAIN_HOST + this.ENDPOINT.THEME_BUILDER.UPDATE_SECTION_TYPE_TOP_CATEGORY ,
      reviewData
    ) .pipe(
      map((response: any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );;
  }

  updateSectionTypeBrands(brandsData: any): Observable<any> {
    return this._http.put(
      this.ENDPOINT.MAIN_HOST + this.ENDPOINT.THEME_BUILDER.UPDATE_SECTION_TYPE_BRANDS ,
      brandsData
    ).pipe(
      map((response: any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );;
  }


  updateSectionTitle(titleData: any): Observable<any> {
    return this._http.put(
      this.ENDPOINT.MAIN_HOST + this.ENDPOINT.THEME_BUILDER.UPDATE_SECTION_TITLE ,
       titleData).pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );;
  }

  UpdateSectionTypeBigBanners(imgData: any): Observable<any> {
    return this._http.put(
      this.ENDPOINT.MAIN_HOST + this.ENDPOINT.THEME_BUILDER.UPDATE_SECTION_TYPE_BIG_BANNER ,
      imgData
    ).pipe(
      map((response: any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  UpdateSectionTypeImage(imgData: any): Observable<any> {
    return this._http.put(
      this.ENDPOINT.MAIN_HOST + this.ENDPOINT.THEME_BUILDER.UPDATE_SECTION_TYPE_IMAGES ,
      imgData
    ).pipe(
      map((response: any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  UpdateSectionTypeSiteFeatuers(data:any){
    return this._http.put(
      this.ENDPOINT.MAIN_HOST + this.ENDPOINT.THEME_BUILDER.UPDATE_SECTION_TYPE_SITE_FEATURES ,
      data
    ).pipe(
      map((response: any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  UpdateSectionTypeProducts(data: any): Observable<any> {
    return this._http.put(
      this.ENDPOINT.MAIN_HOST + this.ENDPOINT.THEME_BUILDER.UPDATE_SECTION_TYPE_PRODUCTS ,
      data
    ).pipe(
      map((response: any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  getPageSectionDetails(sectionId: number): Observable<any> {
    return this._http.get(
      this.ENDPOINT.MAIN_HOST + this.ENDPOINT.THEME_BUILDER.GET_PAGE_SECTION_DETAILS + sectionId ,

    ).pipe(
      map((response: any) => {
        if (response.ok) {
          return response.data;
        }
      })
    )
  }

  //get All Icons
  getAllFontAwesome(): Observable<any> {
    return this._http.get<any>("assets/icons/icons.json");
  }

  addSectionTypeTopCategory(body:any){
    return this._http.post(
      this.ENDPOINT.MAIN_HOST + this.ENDPOINT.THEME_BUILDER.ADD_SECTION_TYPE_TOP_CATEGORY,
      body
      ).pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      )

  }


}
