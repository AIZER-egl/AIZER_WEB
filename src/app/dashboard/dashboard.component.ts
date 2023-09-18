import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';
import UserObserver from 'src/@types/userObserver';
import User from 'src/@types/users';
import { UrlSerializer } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {
  constructor (private authService: AuthService) {
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
      console.log(this.user);
    }, (error) => {
      alert('Error: ' + error.error.message);
    });
  }

  public user: User | null = null;
}
