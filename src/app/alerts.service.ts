import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private alertSubject = new Subject<string>();
  public alert$ = this.alertSubject.asObservable();
  constructor() { }

  public danger(message: string): void {
    this.alertSubject.next(`danger#${message}`);
  }

  public success(message: string): void {
    this.alertSubject.next(`success#${message}`);
  }

  public warning(message: string): void {
    this.alertSubject.next(`warning#${message}`);
  }

  public info(message: string): void {
    this.alertSubject.next(`info#${message}`);
  }
}
