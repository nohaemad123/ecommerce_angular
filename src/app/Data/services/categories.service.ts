import { Injectable, inject } from '@angular/core';
import { ENDPOINT } from './endpoint/endpoint';
import { HttpClient } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private ENDPOINT = ENDPOINT;
  private _http:HttpClient = inject(HttpClient);
  private handleError = inject(HandleErrorService);

  constructor() { }

  getAllCategories(filterCriteria?: any): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.CATEGORIES.GET_ALL_CATEGORIES, { params: filterCriteria })
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  getCategoriesTreeList(): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.CATEGORIES.GET_CATEGORIES_TREE_LIST)
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  
  getAllStoreCategories(filterCriteria?: any): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.CATEGORIES.GET_ALL_STORE_CATEGORIES, { params: filterCriteria })
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  getCategoriesLOV(): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.CATEGORIES.GET_ALL_CATEGORIES_LIST_OF_VALUE)
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  getCategoryById(categoryId: number): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.CATEGORIES.GET_CATEGORY_BY_ID +`${categoryId}`)
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  addCategory(categoryData: any): Observable<any> {
    return this._http.post(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.CATEGORIES.ADD_CATEGORY, categoryData)
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  // uploadAttachmentWithPipe(formData: any, uploadFolderName = ''): Observable<any> {
  //   let url = `${environment.ecommerce_URL}/General/UploadImages?FolderName=${uploadFolderName}`;
  //   return this._http.post<any>(url, formData, {
  //     observe: 'events',
  //     reportProgress: true,
  //   });
  // }

  updateCategory(categoryData: any, categoryId: number): Observable<any> {
    return this._http.put(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.CATEGORIES.UPDATE_CATEGORY+`${categoryId}`, categoryData)
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this._http.delete<any>(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.CATEGORIES.DELETE_CATEGORY +`${categoryId}`)
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response;
        }
      })
    );
  }

  // Sub Categories

  getAllSubCategories(filterCriteria?: any): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.SUB_CATEGORY.GET_SUB_CATEGORIES_BY_CATEGORY_ID,
      { params: filterCriteria }
      ).pipe(
        map((response:any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

  getSubCategoriesLOV(): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.SUB_CATEGORY.GET_SUB_CATEGORIES_LIST_OF_VIEW)
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  getSubCategoryById(categoryId: number): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.SUB_CATEGORY.GET_SUB_CATEGORY_BY_ID + categoryId)
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  addSubCategory(categoryData: any): Observable<any> {
    return this._http.post(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.SUB_CATEGORY.ADD_SUB_CATEGORY , categoryData)
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  updateSubCategory(categoryData: any, categoryId: number): Observable<any> {
    return this._http.put(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.SUB_CATEGORY.UPDATE_SUB_CATEGORY+`${categoryId}` , categoryData)
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  deleteSubCategory(categoryId: number): Observable<any> {
    return this._http.delete<any>(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.SUB_CATEGORY.DELETE_SUB_CATEGORY+categoryId )
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }



}
