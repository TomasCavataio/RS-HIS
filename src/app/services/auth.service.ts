import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAccount, LoginResponse } from '../models/user-account';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(userAccount: UserAccount): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/login`, userAccount);
  }

  isLoggedIn(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  register(userAccount: UserAccount): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/register`, userAccount);
  }
}
