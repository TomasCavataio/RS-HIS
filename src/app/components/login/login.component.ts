import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserAccount, LoginResponse } from 'src/app/models/user-account';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  matcher = new ErrorStateMatcher();
  isInvalid = false;
  dialogRef: MatDialogRef<LoginComponent>;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  registerForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router, public dialog: MatDialog, public snackbar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['./home']);
    }
  }

  login(userAccount: UserAccount): void {
    this.authService.login(userAccount).subscribe((data) => {
      this.router.navigate(['./home']);
      localStorage.setItem('token', data.token);
    }, (error) => {
      this.isInvalid = true;
    });
  }

  register(userAccount: UserAccount): void {
    this.authService.register(userAccount).subscribe(() => {
      this.router.navigate(['./login']);
      this.openSnackBar('Account Created Successfully');
      this.registerForm.reset();
    });
  }

  openRegister(templateRef): void {
    this.dialogRef = this.dialog.open(templateRef, {
      width: '45vw',
      height: '60vh'
    });
  }
  openSnackBar(message: string): void {
    const snackRef = this.snackbar.open(message, 'Close', {
      duration: 3500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
