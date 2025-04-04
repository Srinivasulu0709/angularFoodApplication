import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {ErrorHandlerService} from './interceptors/error-handler.service';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { TokenService } from './interceptors/token.service';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenService, multi: true },
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient()
  ]
};
