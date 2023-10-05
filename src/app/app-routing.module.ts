import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home/home.component';
import { GroupsComponent } from './groups/groups/groups.component';
import { GroupComponent } from './groups/group/group.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: AuthComponent },
  { path: 'logup', component: AuthComponent },
  { path: 'logout', component: AuthComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'groups/:uuid', component: GroupComponent },
  { path: 'groups/:uuid/members/:uuidf', component: UsersComponent },
  { path: 'groups/:uuid/members/:uuidf/edit', component: UsersComponent },
  { path: 'users/:uuid', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
