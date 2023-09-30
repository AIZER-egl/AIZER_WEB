import { Injectable } from '@angular/core';

import { AuthService } from './auth-service.service';
import api from 'src/keys';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AllGroupObservable, FullGroupObservable, GroupObservable } from 'src/@types/observables/GroupObservable';
import { User } from 'src/@types/user/users';
import { UserObserver } from 'src/@types/observables/UserObservable';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient, private authService: AuthService, private alertsService: AlertsService) { }

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

  public requestFullGroup (uuid: string): Observable<FullGroupObservable | null> | null {
    if (!this.authService.isLoggedIn()) return null;
    const headers = this.authService.getHeaders();
    return this.http.get(api.groupsEndpoint + `/${uuid}/full`, { headers }) as Observable<FullGroupObservable | null>;
  };

  public acceptMemberRequest (uuid: string, uuidf: string) {
    if (!this.authService.isLoggedIn()) return null;
    const headers = this.authService.getHeaders();
    return this.http.post(api.groupsEndpoint + `/${uuid}/members/accept/${uuidf}`, {}, { headers }).subscribe(
      () => {
        this.alertsService.success(`Se ha agregado al usuario a tu grupo`);
      }
      , () => {
      this.alertsService.danger('No se ha podido aceptar la solicitud');
    });
  };

  public acceptAllMemberRequests (uuid: string) {
    if (!this.authService.isLoggedIn()) return null;
    const headers = this.authService.getHeaders();
    return this.http.post(api.groupsEndpoint + `/${uuid}/members/accept`, {}, { headers }).subscribe(
      () => {
        this.alertsService.success(`Se han agregado todos los usuarios a tu grupo`);
      }
      , () => {
      this.alertsService.danger('No se ha podido aceptar la solicitud');
    });
  }

  public rejectMemberRequest (uuid: string, uuidf: string) {
    if (!this.authService.isLoggedIn()) return null;
    const headers = this.authService.getHeaders();
    return this.http.post(api.groupsEndpoint + `/${uuid}/members/reject/${uuidf}`, {}, { headers }).subscribe(
      () => {
        this.alertsService.success(`Se ha rechazado la solicitud`);
      }
      , () => {
      this.alertsService.danger('No se ha podido rechazar la solicitud');
    });
  }

  public rejectAllMemberRequests (uuid: string) {
    if (!this.authService.isLoggedIn()) return null;
    const headers = this.authService.getHeaders();
    return this.http.post(api.groupsEndpoint + `/${uuid}/members/reject`, {}, { headers }).subscribe(
      () => {
        this.alertsService.success(`Se han rechazado todas las solicitudes`);
      }
      , () => {
      this.alertsService.danger('No se ha podido rechazar la solicitud');
    });
  }
}
