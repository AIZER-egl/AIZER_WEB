import { Component } from '@angular/core';
import { AlertsService } from '../alerts.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.sass']
})
export class AlertsComponent {
  public alerts: { type: 'danger' | 'success' | 'warning' | 'info', message: string }[] = [];

  alert_timeout: any = null;

  constructor (private alertsService: AlertsService) {};

  ngOnInit() {
    this.alertsService.alert$.subscribe((alert) => {
      console.log(alert);
      const [type, message] = alert.split('#');
      if (this.alerts.length > 0) {
        this.alerts = [];
        clearTimeout(this.alert_timeout);
      }
      this.alerts.push({ type: type as 'danger' | 'success' | 'warning' | 'info', message });
      this.alert_timeout = setTimeout(() => {
        this.alerts = [];
      }, 5000);
    });
  }

  public closeAlert (): void {
    if (this.alert_timeout) {
      this.alerts = [];
      clearTimeout(this.alert_timeout);
    }
  }
}
