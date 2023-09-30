import { Component } from '@angular/core';
import { Group } from 'src/@types/groups/groups';
import { AlertsService } from 'src/app/alerts.service';
import { GroupsService } from 'src/app/groups.service';
import { AuthService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.sass']
})
export class GroupsComponent {
  public groups: Group[] = [];
  public external: Group[] = [];

  constructor (private groupsService: GroupsService, private authService: AuthService, private alertsService: AlertsService) {
    this.groupsService.getGroups()?.subscribe((groups) => {
      if (!groups) {
        this.authService.logout();
        this.alertsService.info('Debes iniciar sesión para ver tus grupos');
      }
      else {
        this.groups = groups.groups;
        this.external = groups.externalGroups;
      }
    }, () => {
      this.authService.logout();
      this.alertsService.info('Debes iniciar sesión para ver tus grupos');
    });
  }

  public requestJoin(uuid: string) {
    this.alertsService.info('Enviando solicitud...');
    this.groupsService.requestJoinGroup(uuid)?.subscribe((userf) => {
      if (!userf?.user) {
        this.alertsService.danger('No se ha podido enviar la solicitud');
      }
      else {
        this.alertsService.success('Solicitud enviada');
      }
    }, (error) => {
      if (error.status == 409) this.alertsService.warning('Ya has enviado una solicitud a este grupo');
      else this.alertsService.danger('No se ha podido enviar la solicitud');
    });
  }
}
