import { Component, OnInit, ViewChild, OnChanges, Input } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: Observable<User[]>;
  displayedColumns: string[] = ['position', 'name', 'surname', 'chn', 'medicalNumber', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Observable<User>>();

  @Input() user: User;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private userService: UserService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getUsers();
    this.users = this.userService.user$;
    this.userService.toggleSpinner();
    this.dataSource.paginator = this.paginator;
  }

  getShowSpinner(): boolean {
    return this.userService.showSpinner;
  }

  openRemoveDialog(user: User): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title: `Confirm deletion`, body: `Are your sure you want to delete the user ${user.name} with ID: ${user.id}` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id).subscribe(() => this.router.navigate(['./users']));
      }
    });
  }

  openEdit(user: User): void {
    this.router.navigate(['./users/edit', user.id]);
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe();
  }

  findUser(filterValue: string): void {
    const firstLetter = filterValue.charAt(0).toUpperCase();
    filterValue = firstLetter + filterValue.substring(1);
    this.userService.findUser(filterValue);
  }
}
