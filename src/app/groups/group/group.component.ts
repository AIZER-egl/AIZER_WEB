import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/@types/groups/groups';
import { AlertsService } from 'src/app/alerts.service';
import { GroupsService } from 'src/app/groups.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.sass']
})
export class GroupComponent {
  public uuid: string = '';
  public group: Group | null = null;

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

  private loadGroup () {
    this.groupsService.getGroup(this.uuid)?.subscribe((group) => {
      if (!group) {
        this.alertsService.danger('No se ha podido cargar el grupo');
        window.location.href = '/groups/';
      } else {
        this.group = group?.group as Group;
      }
    }, (error) => {
      this.alertsService.danger('No se ha podido cargar el grupo');
      window.location.href = '/groups/';
    });
  }

  public stringify (object: any): string {
    return JSON.stringify(object);
  }
}
