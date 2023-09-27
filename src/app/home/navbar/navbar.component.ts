import { Component, Input } from '@angular/core';
import { User } from 'src/@types/user/users';
import { AuthService } from 'src/app/auth-service.service';

import { Group } from 'src/@types/groups/groups';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {
  @Input () group?: Group | null = null;
  public user: User | null = null;

  constructor (private authService: AuthService) {
    this.authService.getUser()?.subscribe((user) => {
      this.user = user?.user as User;
    });
  }
}
