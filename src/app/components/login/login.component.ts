import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user-service.service';
import { UserAccount, LoginResponse } from 'src/app/models/user-account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: string | null;

  constructor(private userService: UserService, private router: Router) { }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
  }

  login(userAccount: UserAccount): void {
    this.userService.login(userAccount).subscribe((data) => {
      this.router.navigate(['./home']);
      localStorage.setItem('token', data.token);
    });
  }


}
