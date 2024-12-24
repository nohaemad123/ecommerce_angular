import { Injectable, inject } from '@angular/core';
import { ENDPOINT } from './endpoint/endpoint';
import { HttpClient } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  private ENDPOINT = ENDPOINT;
  private _http: HttpClient = inject(HttpClient);
  private handleError = inject(HandleErrorService);

  constructor() { }
  getAllProducts(filterCriteria: any, filters?: any): Observable<any> {
    return this._http.post(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.PRODUCTS.GET_ALL_PRODUCTS, filters, { params: filterCriteria })
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

  getProductById(productId: any): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.PRODUCTS.GET_PRODUCT_BY_ID + `${productId}`)
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

  addProduct(productData: any): Observable<any> {
    return this._http.post(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.PRODUCTS.ADD_PRODUCT, productData)
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

  // uploadAttachmentWithPipe(formData: any): Observable<any> {
  //   let url = `${environment.ecommerce_URL}/General/UploadImages?FolderName=Products`;
  //   return this._http.post<any>(url, formData, {
  //     observe: 'events',
  //     reportProgress: true,
  //   });
  // }

  updateProduct( productId: number,productData: any): Observable<any> {

    return this._http.put(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.PRODUCTS.UPDATE_PRODUCT + productId, productData)
  }


  updateProductStatus(status: any, productId: number): Observable<any> {
    return this._http.put(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.PRODUCTS.UPDATE_PRODUCT_STATUS + `?productId=${productId}&status=${status}`, {})
  }

  deleteProduct(productId: number): Observable<any> {
    return this._http.delete<any>(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.PRODUCTS.DELETE_PRODUCT + productId)
  }

  setProductMainImage(id: any): Observable<any> {
    return this._http.put(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.PRODUCTS.UPDATE_PRODUCT_MAIN_IMG + `productImageId=${id}`, {})
  }

  deleteProductImage(id: any): Observable<any> {
    return this._http.delete(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.PRODUCTS.DELETE_PRODUCT, {})
  }



  // getAllCities(): Observable<any> {
  //   return this._http.get(`${this.SERVER_URL}/City/GetAllCities`)
  // }

  // getAllTags(): Observable<any> {
  //   return this._http.get(`${this.SERVER_URL}/Tag/GetAllTags?page=1&limit=10000`)
  // }

  // getAllTax(): Observable<any> {
  //   return this._http.get(`${this.SERVER_URL}/Tax/GetAllTaxes?page=1&limit=10000`)
  // }

  // getProductVariations(productId: number): Observable<any> {
  //   return this._http.get(`${this.SERVER_URL}/ProductVariations/getAllProductVariationsByProductId?ProductId=${productId}`)
  // }

  // getVariationTypes(): Observable<any> {
  //   return this._http.get(`${this.SERVER_URL}/ProductVariationsTypes`)
  // }

  // addProductVariation(variationsData: any): Observable<any> {
  //   return this._http.put(`${this.SERVER_URL}/ProductVariations`, variationsData)
  // }
}
