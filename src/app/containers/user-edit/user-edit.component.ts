import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: User;
  maxDate = new Date();

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, public snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUser();
    this.userService.toggleSpinner();
  }

  getShowSpinner(): boolean {
    return this.userService.showSpinner;
  }

  openSnackBar(message: string): void {
    const snackRef = this.snackbar.open(message, 'Close', {
      duration: 3500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
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
    }
    );
  }

  editUser(user: User): void {
    this.userService.editUser(user).subscribe(
      () => {
        this.router.navigate(['/users']);
        this.openSnackBar('User Updated Successfully');
      },
      (error: Error) => {
        console.error(error);
      }
    );
  }

}
