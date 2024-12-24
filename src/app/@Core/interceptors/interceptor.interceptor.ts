import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/Data/services/auth.service';
import { Router } from '@angular/router';
import { HandleErrorService } from 'src/app/Data/services/handle-error.service';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  authService = inject(AuthService);
  router = inject(Router);
  errorHandler = inject(HandleErrorService);
  transloco = inject(TranslocoService);
  _toastrService = inject(ToastrService);

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  // Modify the request, add headers, handle authentication, etc.
  const modifiedRequest = this.modifyRequest(request);
  return next.handle(modifiedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(error);

      if (error.status === 401) {
        // If unauthorized redirec to login
        this.authService.logout();
        this.router.navigate(['/Auth/Sign-In']);
      }

      if (error.status === 0){
        this._toastrService.error("warning",error.statusText,
        { toastClass: 'toast ngx-toastr toast-warning', closeButton: true });
        console.error('An error occurred:', error);
        this.authService.logout();
        this.router.navigate(['/Auth/Sign-In']);
      }

      // Handle other errors globally
      this.errorHandler.handleError(error);

      // Pass the error along to the calling service
      return throwError(error);
    })
  );
  }

  private modifyRequest(request: HttpRequest<any>): HttpRequest<any> {
    // Example: Add Authorization header if user is authenticated
    const authToken = this.authService.getAuthToken();
    const tenant = this.authService.filterByKeyFromCurrentUser("fathy");
    console.log(tenant);

    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
          Language: this.transloco.getActiveLang(),
        }
      });
    }

    if (tenant) {
      request = request.clone({
        setHeaders: {
          tenant:tenant,
        }
      });
    }

    return request;
  }
}
