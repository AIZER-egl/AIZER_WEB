import { Component } from '@angular/core';
import User from 'src/@types/users';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {
  public user: User | null = null;

  constructor (private authService: AuthService) {
    authService.getUser()?.subscribe((user) => {
      this.user = user?.user as User;
    });
  }
}
