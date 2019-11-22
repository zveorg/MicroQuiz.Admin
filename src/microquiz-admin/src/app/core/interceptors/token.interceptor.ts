import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@core/services';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clone = request.clone({
      url: request.url,
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authenticationService.getSession()}`
      })
    });

    return next.handle(clone);
  }
}