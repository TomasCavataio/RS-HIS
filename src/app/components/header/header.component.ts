import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  mobile = false;

  constructor(
    private userService: UserService, private authService: AuthService,
    public router: Router, public dialog: MatDialog, public snackbar: MatSnackBar) { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    if (window.screen.width <= 425) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  openSnackBar(message: string): void {
    const snackRef = this.snackbar.open(message, 'Close', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['delete-snackbar']
    });
  }


  openRemoveDialog(user: User): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title: `Confirm deletion`, body: `Are your sure that you want to delete all the Doctor users?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteDoctors();
        this.openSnackBar('All Doctors Have Been Successfully Deleted');
      }
    });
  }

  logOut(): void {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}
