import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, UrlSerializer } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent {
  constructor (private authService: AuthService, private usersService: UsersService, private formBuilder: FormBuilder, private urlSerializer: UrlSerializer, private router: Router) {
    if (this.url == '/logout') {
      this.authService.logout();
      window.location.href = '/';
    }

    if (this.authService.isLoggedIn() && this.url == '/login') {
      window.location.href = '/dashboard/';
    }
  }

  public url = this.urlSerializer.serialize(this.router.createUrlTree([], { relativeTo: this.router.routerState.root })).toLowerCase();

  public loginForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  public logupForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    username: ['', Validators.required],
    role: ['', Validators.required],
  });

  public login() {
    this.authService.login(this.loginForm.value);
  }
  public logup() {
    this.usersService.logup(this.logupForm.value)?.subscribe(() => {
      window.location.href = '/dashboard/';
    }, (error) => {
      alert('Error: ' + error.error.message);
    });
  }
}
