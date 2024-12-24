import { Injectable, inject } from '@angular/core';
import { ENDPOINT } from './endpoint/endpoint';
import { HttpClient } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  private ENDPOINT = ENDPOINT;
  private _http: HttpClient = inject(HttpClient);

  constructor() { }

  getAllUnits(): Observable<any> {
    return this._http.get(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.UNITS.GET_ALL_UNITS)
      .pipe(
        map((response: any) => {
          if (response.ok) {
            return response.data;
          }
        })
      );
  }

}
