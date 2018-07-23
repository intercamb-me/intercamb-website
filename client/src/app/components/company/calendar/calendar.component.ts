import {Component, OnInit} from '@angular/core';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap/popover/popover.module';
import {CalendarEvent} from 'angular-calendar';
import {mergeMap} from 'rxjs/operators';
import keyBy from 'lodash-es/keyBy';
import * as startOfMonth from 'date-fns/start_of_month';
import * as endOfMonth from 'date-fns/end_of_month';
import * as startOfWeek from 'date-fns/start_of_week';
import * as endOfWeek from 'date-fns/end_of_week';
import * as startOfDay from 'date-fns/start_of_day';
import * as endOfDay from 'date-fns/end_of_day';
import * as formatDate from 'date-fns/format';

import {CompanyService} from 'app/services/company.service';
import {AlertService} from 'app/services/alert.service';
import {Constants} from 'app/utils/constants';
import {CalendarUtils} from 'app/utils/calendar.utils';
import {Task} from 'app/models/task.model';
import {Client} from 'app/models/client.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit {

  private static readonly VIEW_MONTH = 'month';
  private static readonly VIEW_DAY = 'day';
  private static readonly CLIENT_FIELDS = 'forename surname';

  public calendarView = CalendarComponent.VIEW_MONTH;
  public calendarDate = new Date();
  public calendarMonthEvents: CalendarEvent[] = [];
  public calendarDayEvents: any = {};
  public taskStatus = Constants.TASK_STATUS;
  public dayEvents: any = {};

  constructor(private companyService: CompanyService, private alertService: AlertService) {

  }

  public ngOnInit(): void {
    this.fetchEvents();
  }

  public trackByIndex(index: number): number {
    return index;
  }

  public fetchEvents(): void {
    let currentTasks: Task[];
    this.companyService.listTasks(this.getStartDate(), this.getEndDate()).pipe(
      mergeMap((tasks) => {
        currentTasks = tasks;
        const clientIds: string[] = [];
        tasks.forEach((task) => {
          clientIds.push(task.client);
        });
        return this.companyService.listClients(clientIds, CalendarComponent.CLIENT_FIELDS);
      })
    ).subscribe((clients) => {
      if (this.calendarView === CalendarComponent.VIEW_MONTH) {
        this.calendarMonthEvents = CalendarUtils.getCalendarMonthEvents(currentTasks, clients);
      } else {
        this.setCalendarDayEvents(currentTasks, clients);
      }
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

  public setCalendarView(view: string): void {
    this.calendarView = view;
    this.fetchEvents();
  }

  public onDayClicked(date: Date): void {
    this.calendarView = CalendarComponent.VIEW_DAY;
    this.calendarDate = date;
    this.fetchEvents();
  }

  private getStartDate(): Date {
    const startFunctions = {month: startOfMonth, week: startOfWeek, day: startOfDay};
    return startFunctions[this.calendarView](this.calendarDate);
  }

  private getEndDate(): Date {
    const endFunctions = {month: endOfMonth, week: endOfWeek, day: endOfDay};
    return endFunctions[this.calendarView](this.calendarDate);
  }

  private setCalendarDayEvents(tasks: Task[], clients: Client[]): void {
    const clientById = keyBy(clients, 'id');
    const calendarDayEvents: any = {};
    tasks.forEach((task) => {
      const hourKey = formatDate(task.schedule_date, 'HH:mm');
      const eventKey = task.name;
      if (!calendarDayEvents[hourKey]) {
        calendarDayEvents[hourKey] = {};
      }
      if (!calendarDayEvents[hourKey][eventKey]) {
        calendarDayEvents[hourKey][eventKey] = [];
      }
      const client = clientById[task.client];
      const event = {task, client};
      calendarDayEvents[hourKey][eventKey].push(event);
    });
    this.calendarDayEvents = calendarDayEvents;
  }
}
