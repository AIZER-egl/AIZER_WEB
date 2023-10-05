// TODO: Use cookies instead of local storage

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { UserObserver } from 'src/@types/observables/UserObservable';
import api from 'src/keys';
import { AlertsService } from './alerts.service';
import { User } from 'src/@types/user/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor (private http: HttpClient, private alertsService: AlertsService) { };
  

  public login ({ email, password }: { email: string, password: string }) {
    const body = { email, password };
    const headers = this.getHeaders();
    this.http.post(api.authEndpoint + '/login', body, { headers, withCredentials: true, observe: 'response' })
      .subscribe(() => {
        window.location.href = '/groups/';
        this.alertsService.success('Logged in successfully');
      }, () => {
        this.alertsService.danger('Invalid credentials');
      });
  }

  public logup ({ email, passwordHash, username, graduationYear, campus }: { email: string, passwordHash: string, username: string, graduationYear: number, campus: string }) {
    const body = { email, passwordHash, username, schoolInformation: { graduationYear, campus } };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(api.authEndpoint + '/logup', body, { headers })
      .subscribe(() => {
        window.location.href = '/'
        this.alertsService.info('Inicia sesión para activar tu cuenta');
      }, (error) => {
        this.alertsService.danger(error.error.message);
      });
  }

  private user: User | null = null;
  public getUser(): Observable<UserObserver | null>{
    const headers = this.getHeaders();
    
    if (this.user) {
      return new Observable((observer) => {
        observer.next({ user: this.user! });
      }) as Observable<UserObserver | null>;
    }

    return this.http.get(api.authEndpoint + '/verify', { headers, withCredentials: true }).pipe(
      tap((req: any) => {
        if (req.user) this.user = req.user;
        else this.user = null;
      })
    ) as Observable<UserObserver | null>;
  }


  public getHeaders (): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return headers;
  }

  public logout (): void {
    console.log('Logout??')
    this.http.post(api.authEndpoint + '/logout', {}, { headers: this.getHeaders(), withCredentials: true, observe: 'response' }).subscribe(
      (res) => window.location.href = '/',
      (err) => console.log(err),
    );
  }
}
