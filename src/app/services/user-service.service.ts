import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Patient } from '../models/patient';
import { Professional } from '../models/professional';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://192.168.1.110:3000';
  userSubject = new BehaviorSubject<User[][]>([]);
  user$ = this.userSubject.asObservable();
  users: User[];
  showSpinner = true;
  searchText: string;

  constructor(private http: HttpClient) { }

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

  getProfessionals(): Observable<Professional[]> {
    return this.http.get<Professional[]>(`${this.url}/professionals`);
  }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.url}/patients`);
  }

  getUser(id: string, endPoint: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${endPoint}/${id}`);
  }

  deleteUser(id: string, endPoint: string): Observable<User> {
    return this.http.delete<User>(`${this.url}/${endPoint}/${id}`);
  }

  // Waits until all delete requests are pushed and then executes forkJoin(similar to PromiseAll)
  deleteDoctors(): void {
    this.getProfessionals().subscribe((data) => {
      const doctors: Professional[] = data.filter(
        (professional: Professional) => professional.professionalType === 'Doctor'
      );
      const doctorObservables: Observable<User>[] = [];
      for (const doctor of doctors) {
        doctorObservables.push(this.deleteUser(doctor._id, 'professionals'));
      }
      forkJoin(doctorObservables).subscribe(
        () => {
          this.getUsers().subscribe();
          location.reload();
        },
        (error) => console.error(error)
      );
    });
  }

  addUser(user): Observable<User> {
    if (user.nhc) {
      return this.http.post<User>(`${this.url}/patients`, user);

    } else {
      return this.http.post<User>(`${this.url}/professionals`, user);
    }
  }

  editUser(user): Observable<User> {
    if (user.nhc) {
      return this.http.put<User>(`${this.url}/patients/${user._id}`, user);
    } else {
      return this.http.put<User>(`${this.url}/professionals/${user._id}`, user);
    }
  }

}
