import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter, withDebugTracing, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@ngneat/transloco';
import { AuthInterceptor } from '@Core/interceptors/interceptor.interceptor';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {

  providers: [
    // importProvidersFrom(HttpClientModule),
    provideHttpClient(
      withInterceptorsFromDi(),
  ),
  {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
  },
  provideToastr(),
    provideAnimations(),
    provideRouter(routes,
    // withDebugTracing(),
    withRouterConfig({paramsInheritanceStrategy: 'always'})),
     provideTransloco({
        config: {
          availableLangs: ['en','ar'],
          defaultLang: 'en',
          fallbackLang: 'en',
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      })],

};

