import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { TitleCasePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000/users';
  userSubject = new BehaviorSubject<User[]>([]);
  user$ = this.userSubject.asObservable();
  users: User[];
  showSpinner = true;
  searchText: string;

  constructor(private http: HttpClient, private titleCase: TitleCasePipe) { }

  toggleSpinner(): void {
    this.showSpinner = true;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}`);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.url}/${id}`);
  }

  deleteDoctors(): any {
    const doctors: User[] = this.users.filter(
      (user: User) => user.professionalType === 'Doctor'
    );
    const doctorObservables: Observable<User>[] = [];
    for (const doctor of doctors) {
      doctorObservables.push(this.deleteUser(doctor.id));
    }
    forkJoin(doctorObservables).subscribe(
      () => this.getUsers(),
      (error) => console.error(error)
    );
  }

  addUser(user): Observable<User> {
    return this.http.post<User>(`${this.url}/`, user);
  }

  editUser(user): Observable<User> {
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }

}
