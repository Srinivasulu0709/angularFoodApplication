import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred!';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          // Handle MongoDB duplicate key error
          if (error.status === 400 && error.error.code === 11000) {
            errorMessage = 'This email is already registered. Please use a different one!';
          } else {
            switch (error.status) {
              case 400:
                errorMessage = 'Invalid request. Please check your input!';
                break;
              case 401:
                errorMessage = 'Unauthorized! Please login again.';
                break;
              case 403:
                errorMessage = 'Access denied!';
                break;
              case 404:
                errorMessage = 'Resource not found!';
                break;
              case 500:
                errorMessage = 'Server error! Please try again later.';
                break;
              default:
                errorMessage = `Error ${error.status}: ${error.message}`;
            }
          }
        }

        console.error('API Error:', errorMessage);
        return throwError(() => errorMessage);
      })
    );
    
  }
}

