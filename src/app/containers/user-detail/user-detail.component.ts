import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from 'src/app/models/patient';
import { Professional } from 'src/app/models/professional';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User | Patient | Professional;

  constructor(
    private userService: UserService, public route: ActivatedRoute,
    private router: Router, public dialog: MatDialog, public snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUser();
    this.userService.toggleSpinner();
  }

  getShowSpinner(): boolean {
    return this.userService.showSpinner;
  }

  openEdit(user: User, endPoint: string): void {
    this.router.navigate([`./users/edit/${endPoint}/${user._id}`]);
  }

  getUser(): void {
    const routerParams = this.route.snapshot.params;
    const id = routerParams.id;
    const endPoint = routerParams.endPoint;
    this.userService.getUser(id, endPoint).subscribe((data: User) => {
      this.user = data;
      this.userService.showSpinner = false;
    }, (error: Error) => {
      this.router.navigate(['error404']);
    });
  }

  openRemoveDialog(user: User, endPoint: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title: `Confirm deletion`, body: `Are your sure you want to delete the user ${user.name} ${user.firstSurname}` }
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
      duration: 3500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['delete-snackbar']
    });
  }

  deleteUser(user: User, endPoint: string): void {
    const confirmation = confirm(`Confirm that you want ${user.name} ${user.firstSurname}`);
    if (confirmation) {
      this.userService.deleteUser(user._id, endPoint).subscribe(() =>
        this.router.navigate(['./users']
        ));
    }
  }
}
