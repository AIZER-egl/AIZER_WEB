import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { UsersService } from '../users.service';
import UserObserver from 'src/@types/userObserver';
import User from 'src/@types/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent {
  constructor (private authService: AuthService, private usersService: UsersService) {
    if (!this.authService.isLoggedIn()) {
      window.location.href = '/login/';
    }

    this.authService.getUser()?.subscribe((user: UserObserver | null) => {
      if (!user) {
        this.authService.logout();
        window.location.href = '/login/';
        return;
      }
      this.user = user.user;
    }, () => {
      this.authService.logout();
      window.location.href = '/login'
    });

    this.usersService.getUsers()?.subscribe((users: User[]) => {
      this.users = users;
    });
  }
  public users: User[] | null = null;
  public user: User | null = null;

  public deleteUser(uuid: string) {
    this.usersService.deleteUser(uuid)?.subscribe((response: any) => {
      if (response.success) {
        this.users = this.users?.filter((user: User) => user.uuid !== uuid) as User[];
        alert('User deleted successfully');
      }
    }, (error) => {
      alert('Error: ' + error.error.message);
    });
  }
}
