import { Component, OnInit, ViewChild, OnChanges, Input, QueryList, ViewChildren } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: Observable<User[][]>;
  tab = true;
  professionalsData: MatTableDataSource<User>;
  patientsData: MatTableDataSource<User>;
  displayedColumns: string[] = ['position', 'name', 'surname', 'chn', 'edit', 'delete'];
  secondTableColumns: string[] = ['position', 'name', 'surname', 'medicalNumber', 'edit', 'delete'];

  @Input() user: User;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

  constructor(private userService: UserService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.userService.userSubject.next(data);
      this.users = this.userService.user$;
      this.getPatients(data);
      this.professionalsData = new MatTableDataSource<User>(this.getProfessionals(data));
      this.patientsData = new MatTableDataSource<User>(this.getPatients(data));
      this.patientsData.paginator = this.paginator.toArray()[0];
      this.professionalsData.paginator = this.paginator.toArray()[1];
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
      data: { title: `Confirm deletion`, body: `Are your sure you want to delete the user ${user.name} with ID: ${user.id}` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id, endPoint).subscribe(() => this.router.navigate(['./users']));
      }
    });
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
    this.router.navigate([`./users/edit/${endPoint}/${user.id}`]);
  }

  deleteUser(id: string, endPoint: string): void {
    this.userService.deleteUser(id, endPoint).subscribe();
  }

  findUser(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.patientsData.filter = filterValue.trim().toLowerCase();
    this.professionalsData.filter = filterValue.trim().toLowerCase();
  }

}
