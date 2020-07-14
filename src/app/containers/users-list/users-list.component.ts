import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: User[];
  displayedColumns: string[] = ['position', 'name', 'surname', 'chn', 'medicalNumber', 'edit', 'delete'];
  dataSource = this.users;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  deleteUser(user: User): void {
    const confirmation = confirm(`Confirm that you want ${user.name} ${user.first_surname}, with id: ${user.id} to be deleted`);
    if (confirmation) {
      this.userService.deleteUser(user.id).subscribe(() => this.router.navigate(['./users']));
    }
  }
}
