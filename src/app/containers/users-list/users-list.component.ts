import { Component, OnInit, ViewChild, OnChanges, Input, QueryList, ViewChildren } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Patient } from 'src/app/models/patient';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})

export class UsersListComponent implements OnInit {
  users: Observable<User[][]>;
  professionalsData: MatTableDataSource<User>;
  patientsData: MatTableDataSource<User>;
  usersData: MatTableDataSource<User>;
  userColumns: string[] = ['name', 'surname', 'chn', 'medicalNumber', 'edit', 'delete'];
  patientColumns: string[] = ['name', 'surname', 'chn', 'edit', 'delete'];
  professionalColumns: string[] = ['name', 'surname', 'medicalNumber', 'edit', 'delete'];

  @Input() user: User;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  constructor(
    private userService: UserService, private router: Router,
    public dialog: MatDialog, public snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: User[][]) => {
      this.userService.userSubject.next(data);
      this.users = this.userService.user$;
      this.getPatients(data);
      this.setTablesData(data);
      this.setPaginators();
      this.setSorts();
      this.userService.showSpinner = false;
    });
    this.userService.toggleSpinner();
  }

  getShowSpinner(): boolean {
    return this.userService.showSpinner;
  }

  openRemoveDialog(user: User, endPoint: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title: `Confirm Deletion`, body: `Are your sure you want to delete the user ${user.name} ${user.firstSurname}` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user._id, endPoint).subscribe(() => {
          this.router.navigate(['./users']);
          this.openSnackBar('Deleted Successfully');
        });
      }
    });
  }

  openSnackBar(message: string): void {
    const snackRef = this.snackbar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['delete-snackbar']
    });
  }

  getUsers(data): User[] {
    const users: User[] = [];
    for (const types of data) {
      for (const user of types) {
        users.push(user);
      }
    }
    return users;
  }

  getPatients(users): User[] {
    const patients: User[] = [];
    for (const types of users) {
      for (const patient of types) {
        if (patient.userType === 'Patient') {
          patients.push(patient);
        }
      }
    }
    return patients;
  }

  getProfessionals(users): User[] {
    const professionals: User[] = [];
    for (const types of users) {
      for (const professional of types) {
        if (professional.userType === 'Professional') {
          professionals.push(professional);
        }
      }
    }
    return professionals;
  }

  openEdit(user: User, endPoint: string): void {
    this.router.navigate([`./users/edit/${endPoint}/${user._id}`]);
  }

  deleteUser(id: string, endPoint: string): void {
    this.userService.deleteUser(id, endPoint).subscribe();
  }

  findUser(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersData.filter = filterValue.trim().toLowerCase();
    this.patientsData.filter = filterValue.trim().toLowerCase();
    this.professionalsData.filter = filterValue.trim().toLowerCase();
  }

  setPaginators(): void {
    this.usersData.paginator = this.paginator.toArray()[0];
    this.patientsData.paginator = this.paginator.toArray()[1];
    this.professionalsData.paginator = this.paginator.toArray()[2];
  }

  setTablesData(data): void {
    this.usersData = new MatTableDataSource<User>(this.getUsers(data));
    this.professionalsData = new MatTableDataSource<User>(this.getProfessionals(data));
    this.patientsData = new MatTableDataSource<User>(this.getPatients(data));
  }

  setSorts(): void {
    this.usersData.sort = this.sort.toArray()[0];
    this.patientsData.sort = this.sort.toArray()[1];
    this.professionalsData.sort = this.sort.toArray()[2];
  }

}
