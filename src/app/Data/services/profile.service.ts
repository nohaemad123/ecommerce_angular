import { Injectable, inject } from '@angular/core';
import { ENDPOINT } from './endpoint/endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private ENDPOINT = ENDPOINT;
  private _http: HttpClient = inject(HttpClient);

  constructor() { }

  getStoreProfile(): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.PROFILE.GET_STORE_PROFILE)
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

  getStoreAdress(): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.PROFILE.GET_STORE_ADDRESS)
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

  getAllCities(countryId:any){
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.PROFILE.CITIES_BY_ID+`${countryId}`)
    .pipe(
      map((response: any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  updateStoreProfile(storeProfileData: any): Observable<any> {
    return this._http.put(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.PROFILE.UPDATE_STORE_PROFILE, storeProfileData)
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

  updateStoreAdress(storeAdressData: any): Observable<any> {
    return this._http.put(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.PROFILE.UPDATE_STORE_ADDRESS, storeAdressData)
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }
}
