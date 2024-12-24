import { Injectable, inject } from '@angular/core';
import { ENDPOINT } from './endpoint/endpoint';
import { HttpClient } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private ENDPOINT = ENDPOINT;
  private _http: HttpClient = inject(HttpClient);
  private handleError = inject(HandleErrorService);

  constructor() { }

  getAllOrders(filterCriteria?: any): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.ORDERS.GET_ALL_ORDERS, { params: filterCriteria })
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

  getOrderById(orderId: number): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.ORDERS.GET_ORDER_BY_ID + `${orderId}`)
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

  getOrderHistory(orderId: number): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.ORDERS.GET_ORDER_HISTORY + `${orderId}&limit=100&page=1`)
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

  changeOrderStatus(orderId: number, status: number): Observable<any> {
    return this._http.put(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.ORDERS.CHANGE_ORDER_STATUS + `${orderId}&status=${status}`, {})
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

  getShippingMethods(): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.ORDERS.GET_SHIPMENT_METHODS)
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

  shippingWithOTO(orderId:any): Observable<any> {
    return this._http.post(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.ORDERS.SHIPPING_WITH_OTO, {}, { params: { orderIds: [orderId] } })
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response;
          }
        })
      );
  }

  updateOrderEstimation(estimationData:any): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.ORDERS.UPDATE_ORDER_DELIVERY_ESTIMATION,{params:estimationData})
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response;
          }
        })
      );
  }
}
