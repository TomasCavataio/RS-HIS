import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  constructor(private http: HttpClient, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  add(name: string, surname: string, gender: string, birthday: Date): void {
    const user = {
      name,
      first_surname: surname,
      gender,
      birthday
    };
    this.userService.addUser(user).subscribe(() => this.router.navigate(['/users']));
  }

}
