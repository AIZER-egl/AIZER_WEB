import { Component } from '@angular/core';
import User from 'src/@types/users';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {
  public user: User | null = null;
}
