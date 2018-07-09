import {Component, OnInit} from '@angular/core';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap/popover/popover.module';
import {CalendarEvent} from 'angular-calendar';
import {mergeMap} from 'rxjs/operators';
import keyBy from 'lodash-es/keyBy';
import * as stringToColor from 'string-to-color';
import * as startOfMonth from 'date-fns/start_of_month';
import * as endOfMonth from 'date-fns/end_of_month';
import * as startOfWeek from 'date-fns/start_of_week';
import * as endOfWeek from 'date-fns/end_of_week';
import * as startOfDay from 'date-fns/start_of_day';
import * as endOfDay from 'date-fns/end_of_day';

import {CompanyService} from 'app/services/company.service';
import {AlertService} from 'app/services/alert.service';
import {Constants} from 'app/utils/constants';
import {DateUtils} from 'app/utils/date.utils';
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

  public calendarView = 'month';
  public calendarDate = new Date();
  public calendarEvents: CalendarEvent[] = [];
  public taskStatus = Constants.TASK_STATUS;

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
      if (['month', 'week'].includes(this.calendarView)) {
        this.setCalendarEvents(currentTasks, clients);
      } else {
        this.setDailyCalendarEvents(currentTasks, clients);
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

  private getStartDate(): Date {
    const startFunctions = {month: startOfMonth, week: startOfWeek, day: startOfDay};
    return startFunctions[this.calendarView](this.calendarDate);
  }

  private getEndDate(): Date {
    const endFunctions = {month: endOfMonth, week: endOfWeek, day: endOfDay};
    return endFunctions[this.calendarView](this.calendarDate);
  }

  private setCalendarEvents(tasks: Task[], clients: Client[]): void {
    const clientById = keyBy(clients, 'id');
    const calendarEventsByDate: any = {};
    const calendarEvents: CalendarEvent[] = [];
    tasks.forEach((task) => {
      const client = clientById[task.client];
      const dateIndex = String(DateUtils.toDateOnly(task.schedule_date));
      if (!calendarEventsByDate[dateIndex]) {
        calendarEventsByDate[dateIndex] = {};
      }
      let event: CalendarEvent<CalendarEventMeta> = calendarEventsByDate[dateIndex][task.name];
      if (!event) {
        const color = stringToColor(task.name);
        event = {
          title: task.name,
          color: {primary: color, secondary: color},
          start: task.schedule_date,
          meta: {
            views: [],
          },
        };
        calendarEventsByDate[dateIndex][task.name] = event;
        calendarEvents.push(event);
      }
      event.meta.views.push({task, client});
    });
    this.calendarEvents = calendarEvents;
  }

  private setDailyCalendarEvents(tasks: Task[], clients: Client[]): void {
    const clientById = keyBy(clients, 'id');
    const calendarEvents: CalendarEvent[] = [];
    tasks.forEach((task) => {
      const client = clientById[task.client];
      const color = stringToColor(task.name);
      const event = {
        title: `${client.forename} - ${task.name}`,
        color: {primary: color, secondary: color},
        start: task.schedule_date,
        meta: {task, client},
      };
      calendarEvents.push(event);
    });
    this.calendarEvents = calendarEvents;
  }
}
