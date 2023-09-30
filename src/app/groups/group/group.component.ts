import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FullGroup, Group } from 'src/@types/groups/groups';
import { Log } from 'src/@types/groups/log';
import { AlertsService } from 'src/app/alerts.service';
import { GroupsService } from 'src/app/groups.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.sass']
})
export class GroupComponent {
  public uuid: string = '';
  public group: FullGroup | null = null;
  public display: 'dashboard' | 'content' = 'dashboard';
  public content_type: string = ''; 
  public content: any = [];

  constructor (
    private groupsService: GroupsService,
    private alertsService: AlertsService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.uuid = params['uuid'];
      this.loadGroup();
    })
  }

  private loadContent () {
    this.activatedRoute.queryParams.subscribe((query: { [key: string]: string }) => {
      if (!query['q']) {
        this.display = 'dashboard';
        this.content_type = '';
        this.content = [];
      } else if (this.group && this.group[query['q']] !== undefined) {
        this.display = 'content';
        this.content_type = query['q'];
        this.content = this.group[query['q']];
      }
    });
  }

  private loadGroup () {
    const request = this.groupsService.requestFullGroup(this.uuid)
    if (!request) {
      this.alertsService.danger('No se ha podido cargar el grupo');
      window.location.href = '/groups/';
      return;
    };
    request.subscribe((group) => {
      if (!group) {
        this.alertsService.danger('No se ha podido cargar el grupo');
        window.location.href = '/groups/';
      } else {
        this.group = group?.group as FullGroup;
        this.loadContent();
      }
    }, () => {
      this.alertsService.danger('No se ha podido cargar el grupo');
      window.location.href = '/groups/';
    });
  }

  public stringify (object: any): string {
    return JSON.stringify(object);
  }

  public acceptMemberRequest(uuidf: string) {
    this.alertsService.info('Aceptando solicitud...');
    this.groupsService.acceptMemberRequest(this.uuid, uuidf);
    this.loadGroup();
  }

  public acceptAllMemberRequests() {
    this.alertsService.info('Aceptando solicitudes...');
    if (this.group?.membersRequests.length === 0) {
      this.alertsService.info('No hay solicitudes pendientes');
      return;
    }
    this.groupsService.acceptAllMemberRequests(this.uuid);
    this.loadGroup();
  }

  public rejectMemberRequest(uuidf: string) {
    this.alertsService.info('Rechazando solicitud...');
    this.groupsService.rejectMemberRequest(this.uuid, uuidf);
    this.loadGroup();
  }

  public rejectAllMemberRequests() {
    this.alertsService.info('Rechazando solicitudes...');
    if (this.group?.membersRequests.length === 0) {
      this.alertsService.info('No hay solicitudes pendientes');
      return;
    }
    this.groupsService.rejectAllMemberRequests(this.uuid);
    this.loadGroup();
  }
}
