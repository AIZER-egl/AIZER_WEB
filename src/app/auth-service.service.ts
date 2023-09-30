// TODO: Use cookies instead of local storage

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserObserver } from 'src/@types/observables/UserObservable';
import api from 'src/keys';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor (private http: HttpClient, private alertsService: AlertsService) { };
  

  public login ({ email, password }: { email: string, password: string }) {
    const body = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(api.authEndpoint + '/login', body, { headers })
      .subscribe((response: any) => {
        if (!response.token) this.alertsService.danger('Invalid credentials');
        else {
          this.token = response.token;
          window.location.href = '/groups/';
          this.alertsService.success('Logged in successfully');
        }
      }, (error) => {
        this.alertsService.danger('Invalid credentials');
      });
  }

  public logup ({ email, passwordHash, username, graduationYear, campus }: { email: string, passwordHash: string, username: string, graduationYear: number, campus: string }) {
    const body = { email, passwordHash, username, schoolInformation: { graduationYear, campus } };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(api.authEndpoint + '/logup', body, { headers })
      .subscribe((response: any) => {
        this.token = response.token;
        window.location.href = '/'
        this.alertsService.info('Inicia sesión para activar tu cuenta');
      }, (error) => {
        this.alertsService.danger(error.error.message);
      });
  }

  public getUser(): Observable<UserObserver | null> | null{
    const token = this.token;
    if (!token) return null;
    const headers = this.getHeaders();
    return this.http.get(api.authEndpoint + '/verify', { headers }) as Observable<UserObserver | null>;
  }

  public getHeaders (): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
    return headers;
  }

  public logout (): void { localStorage.removeItem('token'); }
  public isLoggedIn (): boolean { return !!localStorage.getItem('token'); }

  public set token (token: string) { localStorage.setItem('token', token); }
  public get token (): string | null { return localStorage.getItem('token'); }
}
