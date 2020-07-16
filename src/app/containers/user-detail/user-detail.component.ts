import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUser(this.route.snapshot.params.id);
    this.userService.toggleSpinner();
  }

  getShowSpinner(): boolean {
    return this.userService.showSpinner;
  }


  getUser(id: string): void {
    this.userService.getUser(id).subscribe((data: User) => {
      this.user = data;
      this.userService.showSpinner = false;
    });
  }
  openRemoveDialog(user: User): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: `Confirm deletion`, body: `Are your sure you want to delete the user ${user.name} with ID: ${user.id}` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id).subscribe(() => this.router.navigate(['./users']));
      }
    });
  }

  deleteUser(user: User): void {
    const confirmation = confirm(`Confirm that you want ${user.name} ${user.firstSurname}, with id: ${user.id} to be deleted`);
    if (confirmation) {
      this.userService.deleteUser(user.id).subscribe(() => this.router.navigate(['./users']));
    }
  }
}
