import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import UserObserver from 'src/@types/userObserver';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor (private http: HttpClient) { };
  private authEndpoint = 'http://localhost:3001';

  public login ({ email, password }: { email: string, password: string }) {
    const body = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(this.authEndpoint + '/auth/login', body, { headers })
      .subscribe((response: any) => {
        this.token = response.token;
        window.location.href = '/dashboard/'
      });
  }

  public logout (): void {
    localStorage.removeItem('token');
  }

  public isLoggedIn (): boolean {
    return !!localStorage.getItem('token');
  }

  public set token (token: string) {
    if (token) localStorage.setItem('token', token);
  }
  public get token (): string | null {
    return localStorage.getItem('token');
  }

  public getUser(): Observable<UserObserver | null> | null{
    const token = this.token;
    if (!token) return null;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this.http.get(this.authEndpoint + '/auth/verify', { headers }) as Observable<UserObserver | null>;
  }

  public logup ({ email, password, username, role }: { email: string, password: string, username: string, role: 'admin' | 'member' | 'guest' }): Observable<UserObserver | null> | null {
    const token = this.token;
    if (!token) return null;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    
    const body = { email, password, username, role };
    return this.http.post(this.authEndpoint + '/auth/logup', body, { headers }) as Observable<UserObserver | null>;
  }
}
