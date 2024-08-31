import { AuthService } from './../auth/service/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpClientInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(0),
      catchError((error: HttpErrorResponse) => {
        console.log(error);

        if (error && error.status == 401) {
          window.localStorage.clear();
          this.router.navigate(['/login']);
          this.authService.toast.snackbarError("Invalid email or password");
        }
        else if (error && error.status == 500) {
          window.localStorage.clear();
          this.router.navigate(['/login']);
          this.authService.toast.snackbarError("Something went wrong");
        }

        // Re-throw the error after handling
        return throwError(() => error);
      })
    );
  }
}
