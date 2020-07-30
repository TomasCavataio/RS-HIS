import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Clones the requests and set them the Bearer token
    const tokenizerReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });

    // Sends the clone request with the auth, and resends the user to the login page once the token has expired
    return next.handle(tokenizerReq).pipe(catchError((error, caught) => {

      if (error.status === 401) {
        this.authService.removeToken();
        this.router.navigate(['/login']);
      }
      return throwError(error);
    }));
  }
}
