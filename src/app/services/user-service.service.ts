import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  getUsers(): any {
    return this.http.get(`${this.url}`);
  }

  getUser(id: string): any {
    return this.http.get(`${this.url}/${id}`);
  }
}
