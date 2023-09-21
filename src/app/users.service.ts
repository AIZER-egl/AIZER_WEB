import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';
import UserObserver from 'src/@types/userObserver';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiEndpoint = 'http://localhost:3001/';
  private usersEndpoint = this.apiEndpoint + 'users';

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  public getUser(uuid: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.authService.token}`);
    return this.httpClient.get(this.usersEndpoint + `/${uuid}`, { headers });
  }

  public getUsers(): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.authService.token}`);
    return this.httpClient.get(this.usersEndpoint, { headers });
  }

  public logup ({ email, password, username, role }: { email: string, password: string, username: string, role: 'admin' | 'member' | 'guest' }): Observable<UserObserver | null> | null {
    const token = this.authService.token;
    if (!token) return null;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    
    const body = { email, password, username, role };
    return this.httpClient.put(this.usersEndpoint + '/logup', body, { headers }) as Observable<UserObserver | null>;
  }

  public deleteUser(uuid: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.authService.token}`);
    return this.httpClient.delete(this.usersEndpoint + `/${encodeURIComponent(uuid)}/delete`, { headers });
  }
}
