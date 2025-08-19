import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor  {

  constructor(private apiService:ApiService,private router:Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = this.apiService.getToken();

    if (token) {

        if(this.apiService.isTokenExpired()) {
          this.apiService.logout();
          this.router.navigate(['/login']);
          return EMPTY;
        }

      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 || error.status === 403) {
            this.apiService.logout();
            this.router.navigate(['/login']);
            return EMPTY;
          }
          return throwError(() => error);
        })
      );
    }
    return next.handle(req);
}
}