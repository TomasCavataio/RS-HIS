import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isWelcome = true;
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isWelcome = false;
    }, 750);
  }

}
