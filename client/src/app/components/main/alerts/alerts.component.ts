import {Component, OnInit} from '@angular/core';

import {AlertService, Alert} from 'app/services/alert.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
})
export class AlertsComponent implements OnInit {

  public alerts: Alert[] = [];
  public alertsIds: Set<string> = new Set();

  constructor(private alertService: AlertService) {

  }

  public ngOnInit(): void {
    this.alertService.subscribe((alert) => {
      if (!alert.id || !this.alertsIds.has(alert.id)) {
        this.alerts.push(alert);
        if (alert.id) {
          this.alertsIds.add(alert.id);
        }
        setTimeout(() => {
          this.close(alert);
        }, 5000);
      }
    });
  }

  public trackByAlert(index: number): number {
    return index;
  }

  private close(alert: Alert): void {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
    if (alert.id) {
      this.alertsIds.delete(alert.id);
    }
  }
}
