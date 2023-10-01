import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { Router, UrlSerializer } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent {
  constructor (
    private authService: AuthService,
    private router: Router,
    private urlSerializer: UrlSerializer,
    private formBuilder: FormBuilder,
  ) {
    if (this.url == '/logout') {
      this.authService.logout();
      window.location.href = '/';
    }

    if (this.url == '/login') {
      this.authService.getUser().subscribe(() => {
        window.location.href = '/groups/';
      })
    }
  }

  public url = this.urlSerializer.serialize(this.router.createUrlTree([], { relativeTo: this.router.routerState.root })).toLowerCase();

  public loginForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  public logupForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    passwordHash: ['', Validators.required],
    username: ['', Validators.required],
    graduationYear: ['', Validators.required],
    campus: ['', Validators.required],
  });

  public login (): void {
    this.authService.login(this.loginForm.value);
  }

  public logup (): void {
    this.authService.logup(this.logupForm.value);
  }
}
