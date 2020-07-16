import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, public router: Router) { }

  ngOnInit(): void {
  }

  showUsers(): void {
  }

  deleteDoctors(): void {
    this.userService.deleteDoctors();
  }
}
