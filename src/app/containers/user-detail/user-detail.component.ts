import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User;
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser(this.route.snapshot.params.id);
    this.userService.getUsers();
  }

  getUser(id: string): void {
    this.userService.getUser(id).subscribe((data: User) => {
      this.user = data;
      console.log(this.user);
    });
  }

}
