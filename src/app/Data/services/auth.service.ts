import { ENDPOINT } from './endpoint/endpoint';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HandleErrorService } from './handle-error.service';
import { LocalStorageService } from '@Shared/services/local-storage.service';
import { country } from '../models/country/country';

@Injectable({ providedIn: 'root' })

export class AuthService {

  public currentUser: Observable<any>;
  private currentUserSubject: BehaviorSubject<any>;

  private ENDPOINT = ENDPOINT;
  private localSTG = inject(LocalStorageService);
  private _http:HttpClient = inject(HttpClient);
  private handleError = inject(HandleErrorService);


  constructor() {

    this.currentUserSubject = new BehaviorSubject<any>(this.localSTG.getItem('currentUser')!);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string):Observable<any> {
    return this._http
      .post<any>(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.AUTH.LOGIN , { email, password })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user?.data?.userId && user?.data?.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.localSTG.setItem('currentUser', JSON.stringify(user?.data));
            // notify
            this.currentUserSubject.next(user?.data);
          }

          return user;
        })
      );
  }

  forgotPassword(email: string): Observable<any>{
    return this._http.post(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.AUTH.FORGOT_PASSWORD,{
      "email": email
    })
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );
  }

  checkOTP(code:number,email:string): Observable<any>{
    return this._http.post(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.AUTH.CHECK_OTP,{
      "email":email,
      "code": code
    })
    .pipe(
      map((response:any) => {
        if (response.responseCode == 112) {
          return response.data;
        }
      })
    );
  }

  resetPassword(email: string,password:string,confirmPassword:string): Observable<any>{
    return this._http.post(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.AUTH.RESET_PASSWORD,{
      "email": email,
      "password": password,
      "confirmPassword": confirmPassword
    })
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
          );
  }

  getAllCountries(): Observable<country[]> {
    return this._http.get<country>(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.AUTH.GET_ALL_COUNTRIES)
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );;
  }

  register(payload: any): Observable<any> {
    return this._http.post<any>(this.ENDPOINT.MAIN_HOST + this.ENDPOINT.AUTH.REGISTER_STORE_ADMIN, payload)
    .pipe(
      map((response:any) => {
        if (response.ok) {
          return response.data;
        }
      })
    );;
  }

  // Get the authentication token
  getAuthToken(): string | null {
    const currentUser = JSON.parse(this.localSTG.getItem('currentUser') || '{}');
    return currentUser?.token || null;
  }

  filterByKeyFromCurrentUser(key:string) : any{
    const currentUser = JSON.parse(this.localSTG.getItem('currentUser') || '{}');
    return key;
    // return currentUser?.key || null;
  }

  logout(): void {
    // remove user from local storage to log user out
    this.localSTG.removeByKey('currentUser');
    // notify
    this.currentUserSubject.next(null);
  }
}
