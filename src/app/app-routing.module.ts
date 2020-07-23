import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from './containers/user-detail/user-detail.component';
import { UserCreateComponent } from './containers/user-create/user-create.component';
import { UsersListComponent } from './containers/users-list/users-list.component';
import { UserEditComponent } from './containers/user-edit/user-edit.component';
import { Error404Component } from './components/error404/error404.component';


const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersListComponent },
  { path: 'users/new', component: UserCreateComponent },
  { path: 'users/edit/:endPoint/:id', component: UserEditComponent },
  { path: 'users/:endPoint/:id', component: UserDetailComponent },
  { path: 'error404', component: Error404Component },
  { path: '**', redirectTo: 'error404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
