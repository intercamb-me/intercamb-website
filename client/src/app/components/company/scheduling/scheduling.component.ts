import {Component, OnInit} from '@angular/core';
import groupBy from 'lodash-es/groupBy';
// import * as formatDate from 'date-fns/format';
import * as setHours from 'date-fns/set_hours';
import * as setMinutes from 'date-fns/set_minutes';
import * as setSeconds from 'date-fns/set_seconds';
import * as setMilliseconds from 'date-fns/set_milliseconds';

import {CompanyService} from 'app/services/company.service';
import {AlertService} from 'app/services/alert.service';
import {Task} from 'app/models/task.model';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
})
export class SchedulingComponent implements OnInit {

  public tasks: Task[];
  public tasksByDate: any;
  public dates: string[];
  public loading = true;

  constructor(private companyService: CompanyService, private alertService: AlertService) {

  }

  public ngOnInit(): void {
    this.companyService.listScheduledTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.tasksByDate = groupBy(this.tasks, (task) => {
        let date = task.properties.schedule_date;
        date = setHours(date, 0);
        date = setMinutes(date, 0);
        date = setSeconds(date, 0);
        date = setMilliseconds(date, 0);
        return date.getTime();
      });
      this.loading = false;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }
}
