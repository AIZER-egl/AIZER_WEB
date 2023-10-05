import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertsService } from './alerts.service';
import { AuthService } from './auth-service.service';
import type { AllGroupObservable, FullGroupObservable, GroupObservable } from 'src/@types/observables/GroupObservable';
import type { UserObserver } from 'src/@types/observables/UserObservable';
import api from 'src/keys';
import { Access } from 'src/@types/groups/access';
import { Roles } from 'src/@types/groups/roles';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient, private authService: AuthService, private alertsService: AlertsService) { }

  public getGroups (): Observable<AllGroupObservable | null> {
    const headers = this.authService.getHeaders();
    return this.http.get(api.groupsEndpoint, { headers, withCredentials: true }) as Observable<AllGroupObservable | null>;
  }

  public getGroup (uuid: string): Observable<GroupObservable | null> {
    const headers = this.authService.getHeaders();
    return this.http.get(api.groupsEndpoint + `/${uuid}`, { headers, withCredentials: true }) as Observable<GroupObservable | null>;
  }

  public requestJoinGroup (uuid: string): Observable<UserObserver | null> {
    const headers = this.authService.getHeaders();
    return this.http.post(api.groupsEndpoint + `/${uuid}/members/request`, {}, { headers, withCredentials: true }) as Observable<UserObserver | null>;
  }

  public requestFullGroup (uuid: string): Observable<FullGroupObservable | null> {
    const headers = this.authService.getHeaders();
    return this.http.get(api.groupsEndpoint + `/${uuid}/full`, { headers, withCredentials: true }) as Observable<FullGroupObservable | null>;
  };

  public acceptMemberRequest (uuid: string, uuidf: string) {
    const headers = this.authService.getHeaders();
    return this.http.post(api.groupsEndpoint + `/${uuid}/members/accept/${uuidf}`, {}, { headers, withCredentials: true }).subscribe(
      () => {
        this.alertsService.success(`Se ha agregado al usuario a tu grupo`);
      },
      () => {
      this.alertsService.danger('No se ha podido aceptar la solicitud');
    });
  };

  public acceptAllMemberRequests (uuid: string) {
    const headers = this.authService.getHeaders();
    return this.http.post(api.groupsEndpoint + `/${uuid}/members/accept`, {}, { headers, withCredentials: true }).subscribe(
      () => {
        this.alertsService.success(`Se han agregado todos los usuarios a tu grupo`);
      },
      () => {
        this.alertsService.danger('No se ha podido aceptar la solicitud');
      }
    );
  }

  public rejectMemberRequest (uuid: string, uuidf: string) {
    const headers = this.authService.getHeaders();
    return this.http.post(api.groupsEndpoint + `/${uuid}/members/reject/${uuidf}`, {}, { headers, withCredentials: true }).subscribe(
      () => {
        this.alertsService.success(`Se ha rechazado la solicitud`);
      },
      () => {
        this.alertsService.danger('No se ha podido rechazar la solicitud');
      }
    );
  }

  public rejectAllMemberRequests (uuid: string) {
    const headers = this.authService.getHeaders();
    return this.http.post(api.groupsEndpoint + `/${uuid}/members/reject`, {}, { headers, withCredentials: true }).subscribe(
      () => {
        this.alertsService.success(`Se han rechazado todas las solicitudes`);
      },
      () => {
        this.alertsService.danger('No se ha podido rechazar la solicitud');
      }
    );
  }

  public editMember (uuid: string, uuidf: string, access: Access[], role: Roles) {
    console.log('edit member executed');
    console.log(api.groupsEndpoint + `/${uuid}/members/${uuidf}`);
    this.http.patch(api.groupsEndpoint + `/${uuid}/members/${uuidf}`, { access, role }, { withCredentials: true }).subscribe(
      (r) => {
        this.alertsService.success(`Se ha editado el usuario`);
        console.log(r);
      },
      (e) => {
        console.log(e);
        this.alertsService.danger('No se ha podido editar el usuario');
      }
    )
  }
}
