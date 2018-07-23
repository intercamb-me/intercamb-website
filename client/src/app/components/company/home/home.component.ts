import {Component, OnInit} from '@angular/core';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap/popover/popover.module';
import {CalendarEvent, CalendarUtils as LibCalendarUtils} from 'angular-calendar';
import {GetMonthViewArgs, MonthView, getMonthView} from 'calendar-utils';
import {forkJoin} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import * as startOfWeek from 'date-fns/start_of_week';
import * as addWeeks from 'date-fns/add_weeks';
import * as endOfWeek from 'date-fns/end_of_week';

import {CompanyService} from 'app/services/company.service';
import {AlertService} from 'app/services/alert.service';
import {CalendarUtils} from 'app/utils/calendar.utils';
import {Client} from 'app/models/client.model';
import {Task} from 'app/models/task.model';

export class CustomCalendarUtils extends LibCalendarUtils {

  public getMonthView(args: GetMonthViewArgs): MonthView {
    args.viewStart = startOfWeek(args.viewDate);
    args.viewEnd = endOfWeek(addWeeks(args.viewDate, 1));
    return getMonthView(args);
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [
    {provide: LibCalendarUtils, useClass: CustomCalendarUtils},
  ],
})
export class HomeComponent implements OnInit {

  private static readonly CLIENT_FIELDS = 'forename surname';

  public clientsCount: number;
  public tasks: Task[];
  public clients: Client[];
  public loading = true;
  public calendarDate = new Date();
  public calendarEvents: CalendarEvent[] = [];

  constructor(private companyService: CompanyService, private alertService: AlertService) {

  }

  public ngOnInit(): void {
    const startDate = startOfWeek(new Date());
    const endDate = endOfWeek(addWeeks(new Date(), 1));
    forkJoin([
      this.companyService.countClients(),
      this.companyService.listTasks(startDate, endDate),
    ]).pipe(
      mergeMap((result) => {
        this.clientsCount = result[0];
        this.tasks = result[1];
        const clientIds: string[] = [];
        this.tasks.forEach((task) => {
          clientIds.push(task.client);
        });
        return this.companyService.listClients(clientIds, HomeComponent.CLIENT_FIELDS);
      })
    ).subscribe((clients) => {
      this.clients = clients;
      this.calendarEvents = CalendarUtils.getCalendarMonthEvents(this.tasks, this.clients);
      this.loading = false;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public openEventGroupPopover(popover: NgbPopover, event: CalendarEvent): void {
    popover.popoverTitle = event.title;
    popover.open({event});
  }

  public closeEventGroupPopover(popover: NgbPopover): void {
    popover.close();
  }
}
