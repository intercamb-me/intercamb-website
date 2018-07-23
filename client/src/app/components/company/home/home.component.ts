import {Component, OnInit} from '@angular/core';
import {forkJoin} from 'rxjs';
import * as startOfWeek from 'date-fns/start_of_week';
import * as endOfWeek from 'date-fns/end_of_week';

import {CompanyService} from 'app/services/company.service';
import {AlertService} from 'app/services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  public clientsCount: number;
  public tasksCount: number;

  constructor(private companyService: CompanyService, private alertService: AlertService) {

  }

  public ngOnInit(): void {
    const startDate = startOfWeek(new Date());
    const endDate = endOfWeek(new Date());
    forkJoin([
      this.companyService.countClients(),
      this.companyService.countTasks(startDate, endDate),
    ])
    .subscribe((result) => {
      this.clientsCount = result[0];
      this.tasksCount = result[1];
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }
}
