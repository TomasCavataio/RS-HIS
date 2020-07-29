import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from './containers/user-detail/user-detail.component';
import { UserCreateComponent } from './containers/user-create/user-create.component';
import { UsersListComponent } from './containers/users-list/users-list.component';
import { UserEditComponent } from './containers/user-edit/user-edit.component';
import { Error404Component } from './components/error404/error404.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersListComponent, canActivate: [AuthGuard] },
  { path: 'users/new', component: UserCreateComponent, canActivate: [AuthGuard] },
  { path: 'users/edit/:endPoint/:id', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'users/:endPoint/:id', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: 'error404', component: Error404Component },
  { path: '**', redirectTo: 'error404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
