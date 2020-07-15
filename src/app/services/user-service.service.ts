import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000/users';
  userSubject = new BehaviorSubject<User[]>([]);
  user$ = this.userSubject.asObservable();
  constructor(private http: HttpClient) { }

  getUsers(): void {
    this.http.get<User[]>(`${this.url}`).subscribe(data => {
      this.userSubject.next(data);
    });
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.url}/${id}`);
  }

  addUser(user): Observable<User> {
    return this.http.post<User>(`${this.url}/`, user);
  }
}
