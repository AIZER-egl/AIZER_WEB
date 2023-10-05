import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AlertsService } from './alerts.service';
import { AuthService } from './auth-service.service';
import type { UserObserver } from 'src/@types/observables/UserObservable';
import type { MemberObservable } from 'src/@types/observables/GroupObservable';
import api from 'src/keys';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private alertsService: AlertsService,
  ) { }

  public getUser (uuid: string) {
    const headers = this.authService.getHeaders();
    return this.http.get(api.userEndpoint + `/${uuid}`, { headers, withCredentials: true }) as Observable<UserObserver | null>;
  }

  public getMember(uuid: string, groupUuid: string) {
    const headers = this.authService.getHeaders();
    return this.http.get(api.groupsEndpoint + `/${groupUuid}/members/${uuid}`, { headers, withCredentials: true }) as Observable<MemberObservable | null>;
  }

  public getMembers(groupUuid: string) {
    const headers = this.authService.getHeaders();
    return this.http.get(api.groupsEndpoint + `/${groupUuid}/members`, { headers, withCredentials: true }) as Observable<MemberObservable[] | null>;
  }
}
