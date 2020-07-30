import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserAccount } from 'src/app/models/user-account';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  matcher = new ErrorStateMatcher();
  isInvalid = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) { }



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


}
