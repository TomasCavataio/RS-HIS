import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser(this.route.snapshot.params.id);
  }

  getUser(id: string): void {
    this.userService.getUser(id).subscribe((data: User) => {
      this.user = data;
    });
  }

}
