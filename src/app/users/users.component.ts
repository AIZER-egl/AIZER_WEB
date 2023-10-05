import { Component } from '@angular/core';
import { UrlSerializer, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { AlertsService } from '../alerts.service';
import { FullMember, Member } from 'src/@types/groups/member';
import { User } from 'src/@types/user/users';
import { Group } from 'src/@types/groups/groups';
import { Access } from 'src/@types/groups/access';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { Roles } from 'src/@types/groups/roles';
import { GroupsService } from '../groups.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent {
  public userAccesses: Access[] = [];
  public userRole: Roles | null = null;
  public accesses: Access[] = ['finance', 'projects', 'human-resources', 'marketing', 'inventory', 'statistics'];
  public url: string[] = this.urlSerializer.serialize(this.router.createUrlTree([], { relativeTo: this.router.routerState.root })).toLowerCase().split('/');
  public self: User | null = null;
  public selfMember: Member | null = null;

  public content_type: 'edit' | 'member' | 'user' | 'error' = 'error';
  public content: any;
  constructor (
    private urlSerializer: UrlSerializer,
    private router: Router,
    private usersService: UsersService,
    private alertsService: AlertsService,
    private authService: AuthService,
    private groupsService: GroupsService,
    private formBuilder: FormBuilder,
  ) {
    this.url.shift();
    if (this.url[4] == 'edit') this.setMemberEditContent();
    else if (this.url[2] == 'members') this.setMemberContent();
    else if (this.url[0] == 'users') this.setUserContent();
    else this.throwError('Invalid URL');
  }

  private setMemberContent() {
    this.content_type = 'member';
    this.usersService.getMember(this.url[3], this.url[1]).subscribe(
      (data: any) => {
        this.content = data.member as FullMember;
        this.authService.getUser().subscribe((r) => {
          this.self = r?.user as User;
          this.usersService.getMember(this.self.uuid, this.url[1]).subscribe((r) => {
            this.selfMember = r?.member as Member;
          });
        })
      },
      (err) => this.throwError(err.error.message),
    );
  }

  private setUserContent() {
    this.content_type = 'user';
    this.usersService.getUser(this.url[1]).subscribe(
      (data: any) => this.content = data as { user: User, groups: Group[] },
      (err: any) => this.throwError(err.error.message)
    );
  }

  private setMemberEditContent() {
    this.content_type = 'edit';
    this.usersService.getMember(this.url[3], this.url[1]).subscribe(
      (data: any) => {
        this.content = data as FullMember;
        this.userAccesses = this.content.member.access;
        this.userRole = this.content.member.role;
        this.authService.getUser().subscribe((r) => {
          this.self = r?.user as User;
          this.usersService.getMember(this.self.uuid, this.url[1]).subscribe((r) => {
            this.selfMember = r?.member as Member;
            console.log(this.selfMember);
          });
        })
      },
      (err) => this.throwError(err.error.message),
    );
  }

  private throwError(message: string) {
    this.content_type = 'error';
    this.alertsService.danger(message);
  }

  public toStringAccess(access: Access[]) {
    if (!access || !access.length) return 'Default';
    return access.join(', ');
  }

  public includesAccess(access: Access) {
    return (this.content?.member as Member)?.access?.includes(access);
  }

  public printContent() {
    console.log(this.content);
  }

  public formTemplate = this.formBuilder.group({});
  public checkboxChange(event: any, access: Access) {
    if (event.target.checked) this.userAccesses.push(access);
    else this.userAccesses.splice(this.userAccesses.indexOf(access), 1);
  }
  public roleChange(event: any) {
    this.userRole = event.target.value;
  }
  public submit() {
    this.alertsService.info('Actualizando...');
    this.groupsService.editMember(this.url[1], this.url[3], this.userAccesses, this.userRole!);
  }

  public isAdmin() {
    const role = 'admin' as unknown as Roles;
    return this.selfMember?.role == role;
  }

}
