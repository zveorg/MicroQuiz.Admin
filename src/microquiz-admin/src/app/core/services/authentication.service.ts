import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { LocalStorageKeys } from '../common/enums';
import { ILoginRequest } from '@core/models/login.request';
import { ILoginResponse } from '@core/models/login.response';

@Injectable()
export class AuthenticationService  {
  private authToken: string = LocalStorageKeys.AUTH_TOKEN.toString();

  constructor(
    private http: HttpClient,
  ) {}

  login(loginRequest: ILoginRequest): Observable<ILoginResponse> {
    const formData = new FormData();
    formData.set('username', loginRequest.username);
    formData.set('password', loginRequest.password);
    formData.set('client_id', 'api');
    formData.set('grant_type', 'password');
    return this.http.post<ILoginResponse>('/api/auth-service/connect/token', formData).pipe(
      tap((res: ILoginResponse) => this.setSession(res.access_token)));
  }

  setSession(token: string): void {
    localStorage.setItem(this.authToken, token);
  }

  getSession(): string {
    return localStorage.getItem(this.authToken);
  }

  logout(): void {
    localStorage.removeItem(this.authToken);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.authToken);
  }
}