import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  showUsers(): void {
  }

  multipleDelete(): void {

  }
}
