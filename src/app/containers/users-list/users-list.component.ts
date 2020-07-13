import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }


  alert(element): void {
    console.log(element);
  }
}
