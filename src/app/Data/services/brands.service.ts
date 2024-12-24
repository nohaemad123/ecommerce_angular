import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { HandleErrorService } from './handle-error.service';
import { Observable, catchError, map } from 'rxjs';
import { ENDPOINT } from './endpoint/endpoint';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  private ENDPOINT = ENDPOINT;
  private _http:HttpClient = inject(HttpClient);
  private handleError = inject(HandleErrorService);


  constructor() { }


  //ListOfValues
  getBrandsList():Observable<any>{
    return this._http.get(
      this.ENDPOINT.MAIN_HOST + this.ENDPOINT.BRANDS.GET_ALL_BRANDS + `/ListOfValues/getBrands`
    ) .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  getAllBrands(filterCriteria?: any): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.BRANDS.GET_ALL_BRANDS, { params: filterCriteria })
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  getBrandById(brandId: any): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.BRANDS.GET_BRAND_BY_ID +`${brandId}`)
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  addBrand(brandData: any): Observable<any> {
    return this._http.post(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.BRANDS.ADD_BRAND, brandData)
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  updateBrand(brandData: any, brandId: number): Observable<any> {
    return this._http.put(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.BRANDS.UPDATE_BRAND + brandId, brandData)
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  deleteBrand(brandId: number): Observable<any> {
    return this._http.delete<any>(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.BRANDS.DELETE_BRAND + brandId)
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

}
