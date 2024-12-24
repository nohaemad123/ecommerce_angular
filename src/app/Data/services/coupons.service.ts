import { Injectable, inject } from '@angular/core';
import { ENDPOINT } from './endpoint/endpoint';
import { HttpClient } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  private ENDPOINT = ENDPOINT;
  private _http:HttpClient = inject(HttpClient);
  private handleError = inject(HandleErrorService);

  constructor() { }

  getAllCoupons(filterCriteria?: any): Observable<any> {
    return this._http.get( this.ENDPOINT.MAIN_HOST + this.ENDPOINT.COUPONS.GET_ALL_COUPONS, { params: filterCriteria })
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  getCouponById(couponId: any): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.COUPONS.GET_COUPON_BY_ID + couponId)
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  addCoupon(couponData: any): Observable<any> {
    return this._http.post(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.COUPONS.ADD_COUPON, couponData)
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  updateCoupon(couponData: any, couponId: number): Observable<any> {
    return this._http.put(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.COUPONS.UPDATE_COUPON+`${couponId}`, couponData)
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  deleteCoupon(couponId: number): Observable<any> {
    return this._http.delete<any>(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.COUPONS.DELETE_COUPON+`${couponId}`)
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  generateCode():Observable<any>{
    return this._http.get<any>(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.COUPONS.GENERATE_CODE)
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  getAllDiscountType() {
    return this._http.get<any>(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.COUPONS.GET_ALL_DISCOUNT_TYPE)
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }
}
