import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getUser(this.route.snapshot.params.id);
  }

  getUser(id: string): void {
    this.userService.getUser(id).subscribe((data: User) => {
      this.user = data;
    });
  }

  deleteUser(user: User): void {
    const confirmation = confirm(`Confirm that you want ${user.name} ${user.first_surname}, with id: ${user.id} to be deleted`);
    if (confirmation) {
      this.userService.deleteUser(user.id).subscribe(() => this.router.navigate(['./users']));
    }
  }
}
