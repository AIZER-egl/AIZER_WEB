import { Component, Input } from '@angular/core';
import { User } from 'src/@types/user/users';
import { AuthService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {
  @Input () group?: string | null;
  public user: User | null = null;

  constructor (private authService: AuthService) {
    this.authService.getUser()?.subscribe((user) => {
      this.user = user?.user as User;
    });
  }
}
