import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  mobile = false;

  constructor(private userService: UserService, public router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (window.screen.width <= 425) {
      this.mobile = true;
    }
  }


  openRemoveDialog(user: User): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title: `Confirm deletion`, body: `Are your sure that you want to delete all the Doctor users?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteDoctors();
      }
    });
  }
}
