import { Injectable, inject } from '@angular/core';
import { ENDPOINT } from './endpoint/endpoint';
import { HttpClient } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private ENDPOINT = ENDPOINT;
  private _http: HttpClient = inject(HttpClient);
  private handleError = inject(HandleErrorService);

  constructor() { }

  getAllProducts(): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.LIST_OF_VALUES.PRODUCTS)
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

  getProductSale(filterCriteria: any) {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.REPORTS.PRODUCT_SALE, { params: filterCriteria })
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }


  getAllCategories(): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.LIST_OF_VALUES.CATEGORIES)
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

  getCategorySale(filterCriteria: any) {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.REPORTS.CATEGORY_SALE, { params: filterCriteria })
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

  getAllCities(): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.LIST_OF_VALUES.CITIES)
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

  getCitySale(filterCriteria: any) {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.REPORTS.CITY_SALE, { params: filterCriteria })
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

  getAllBrands(filterCriteria?: any): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.LIST_OF_VALUES.BRANDS, { params: filterCriteria })
    .pipe(
      map((response: any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  getBrandSale(filterCriteria: any) {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.REPORTS.BRANDS_SALE, { params: filterCriteria })
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

  getAllCoupons(filterCriteria?: any): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.LIST_OF_VALUES.COUPONS, { params: filterCriteria })
    .pipe(
      map((response: any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  getCouponSale(filterCriteria: any) {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.REPORTS.COUPON_SALE, { params: filterCriteria })
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }


}
