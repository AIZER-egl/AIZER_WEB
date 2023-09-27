import { Injectable } from '@angular/core';

import { AuthService } from './auth-service.service';
import api from 'src/keys';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AllGroupObservable, GroupObservable } from 'src/@types/observables/GroupObservable';
import { User } from 'src/@types/user/users';
import { UserObserver } from 'src/@types/observables/UserObservable';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getGroups (): Observable<AllGroupObservable | null> | null {
    if (!this.authService.isLoggedIn()) return null;
    const headers = this.authService.getHeaders();
    return this.http.get(api.groupsEndpoint, { headers }) as Observable<AllGroupObservable | null>;
  }

  public getGroup (uuid: string): Observable<GroupObservable | null> | null {
    if (!this.authService.isLoggedIn()) return null;
    const headers = this.authService.getHeaders();
    return this.http.get(api.groupsEndpoint + `/${uuid}`, { headers }) as Observable<GroupObservable | null>;
  }

  public requestJoinGroup (uuid: string): Observable<UserObserver | null> | null {
    if (!this.authService.isLoggedIn()) return null;
    const headers = this.authService.getHeaders();
    return this.http.post(api.groupsEndpoint + `/${uuid}/members/request`, {}, { headers }) as Observable<UserObserver | null>;
  }
}
