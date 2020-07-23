import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Patient } from '../models/patient';
import { Professional } from '../models/professional';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { TitleCasePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000';
  userSubject = new BehaviorSubject<User[][]>([]);
  user$ = this.userSubject.asObservable();
  users: User[];
  showSpinner = true;
  searchText: string;

  constructor(private http: HttpClient, private titleCase: TitleCasePipe) { }

  toggleSpinner(): void {
    this.showSpinner = true;
  }

  // Waits to get all professionals and patients to then push them into an Observable array.
  getUsers(): Observable<User[][]> {
    const users: Observable<User[]>[] = [];
    users.push(this.getPatients());
    users.push(this.getProfessionals());
    return forkJoin(users);
  }

  // Returns all professionals as an array of Observables.
  getProfessionals(): Observable<Professional[]> {
    return this.http.get<Professional[]>(`${this.url}/professionals`);
  }

  // Returns all patients as an array of Observables.
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.url}/patients`);
  }

  // Returns a specific user so you can go into it's details
  getUser(id: string, endPoint: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${endPoint}/${id}`);
  }

  // Deletes a specific user
  deleteUser(id: string, endPoint: string): Observable<User> {
    return this.http.delete<User>(`${this.url}/${endPoint}/${id}`);
  }

  /*   deleteDoctors(): any {
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
    } */

  addUser(user): Observable<User> {
    return this.http.post<User>(`${this.url}/`, user);
  }

  editUser(user): Observable<User> {
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }

}
