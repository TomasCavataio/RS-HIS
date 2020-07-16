import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: User;
  maxDate = new Date();

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

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

  editUser(user: User): void {
    this.userService.editUser(user).subscribe(
      () => this.router.navigate(['/users']),
      (error: Error) => {
        console.error(error);
      }
    );
  }

}
