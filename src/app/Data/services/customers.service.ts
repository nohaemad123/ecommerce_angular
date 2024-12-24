import { Injectable, inject } from '@angular/core';
import { ENDPOINT } from './endpoint/endpoint';
import { HttpClient } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private ENDPOINT = ENDPOINT;
  private _http: HttpClient = inject(HttpClient);
  private handleError = inject(HandleErrorService);

  getAllCustomers(filterCriteria?: any): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.CUSTOMERS.GET_ALL_CUSTOMERS, { params: filterCriteria })
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

  getCustomerById(customerId: any): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.CUSTOMERS.GET_CUSTOMER_BY_ID + customerId)
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

  getCustomerOrderHistory(filterCriteria: any): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.CUSTOMERS.GET_CUSTOMER_HISTORY, { params: filterCriteria })
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

  lockCustomerAccount(customerId: any): Observable<any> {
    return this._http.put(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.CUSTOMERS.LOCK_CUSTOMER + customerId, {})
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

  unlockCustomerAccount(customerId: any): Observable<any> {
    return this._http.put(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.CUSTOMERS.UNLOCK_CUSTOMER + customerId, {})
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

}
