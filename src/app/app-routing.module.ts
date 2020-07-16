import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from './containers/user-detail/user-detail.component';
import { UserCreateComponent } from './containers/user-create/user-create.component';
import { UsersListComponent } from './containers/users-list/users-list.component';
import { UserEditComponent } from './containers/user-edit/user-edit.component';


const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersListComponent },
  { path: 'users/new', component: UserCreateComponent },
  { path: 'users/edit/:id', component: UserEditComponent },
  { path: 'users/:id', component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
