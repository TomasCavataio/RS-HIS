import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnChanges {
  users: Observable<User[]>;
  displayedColumns: string[] = ['position', 'name', 'surname', 'chn', 'medicalNumber', 'edit', 'delete', 'checkbox'];
  dataSource = this.users;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers();
    this.users = this.userService.user$;
  }

  ngOnChanges(): void {
    this.userService.user$ = this.users;
  }

  getUsers(): void {
    this.userService.getUsers();
  }

  deleteUser(user: User): void {
    const confirmation = confirm(`Confirm that you want ${user.name} ${user.firstSurname}, with id: ${user.id} to be deleted`);
    if (confirmation) {
      this.userService.deleteUser(user.id).subscribe(() => this.router.navigate(['./users']));
    }
  }
}
