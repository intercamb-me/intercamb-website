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
import {DateUtils} from 'app/utils/date.utils';
import {getColor} from 'app/utils/helpers';
import {Task} from 'app/models/task.model';
import {Client} from 'app/models/client.model';

interface MetaViews {
  task: Task;
  client: Client;
}

interface CalendarEventMeta {
  views: MetaViews[];
}

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
})
export class SchedulingComponent implements OnInit {

  private static readonly VIEW_MONTH = 'month';
  private static readonly VIEW_DAY = 'day';

  public calendarView = SchedulingComponent.VIEW_MONTH;
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
    this.companyService.listScheduledTasks(this.getStartDate(), this.getEndDate()).pipe(
      mergeMap((tasks) => {
        currentTasks = tasks;
        const clientIds: string[] = [];
        tasks.forEach((task) => {
          clientIds.push(task.client);
        });
        return this.companyService.listClients(clientIds);
      })
    ).subscribe((clients) => {
      if (this.calendarView === SchedulingComponent.VIEW_MONTH) {
        this.setCalendarMonthEvents(currentTasks, clients);
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
    this.calendarView = SchedulingComponent.VIEW_DAY;
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

  private setCalendarMonthEvents(tasks: Task[], clients: Client[]): void {
    const clientById = keyBy(clients, 'id');
    const eventsByDate: any = {};
    const events: CalendarEvent[] = [];
    tasks.forEach((task) => {
      const client = clientById[task.client];
      const dateIndex = String(DateUtils.toDateOnly(task.schedule_date));
      if (!eventsByDate[dateIndex]) {
        eventsByDate[dateIndex] = {};
      }
      let event: CalendarEvent<CalendarEventMeta> = eventsByDate[dateIndex][task.name];
      if (!event) {
        const color = getColor(task.name);
        event = {
          title: task.name,
          color: {primary: color, secondary: color},
          start: task.schedule_date,
          meta: {
            views: [],
          },
        };
        eventsByDate[dateIndex][task.name] = event;
        events.push(event);
      }
      event.meta.views.push({task, client});
    });
    this.calendarMonthEvents = events;
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
