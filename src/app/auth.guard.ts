import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }


  canActivate(): boolean {
    if (this.userService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['./login']);
    return false;
  }

}
