import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import {CalendarEvent} from 'angular-calendar';
import padStart from 'lodash-es/padStart';
import keyBy from 'lodash-es/keyBy';

import {Helpers} from 'app/utils/helpers';
import {Task} from 'app/models/task.model';
import {Client} from 'app/models/client.model';

interface MetaViews {
  task: Task;
  client: Client;
}

interface CalendarEventMeta {
  views: MetaViews[];
}

export class CalendarUtils {

  public static fromDateOnly(dateOnly: number): Date {
    if (!dateOnly) {
      return null;
    }
    const dateOnlyStr = String(dateOnly);
    const year = dateOnlyStr.substring(0, 4);
    const month = dateOnlyStr.substring(4, 6);
    const day = dateOnlyStr.substring(6, 8);
    const date = new Date(Number(year), Number(month), Number(day));
    return date;
  }

  public static toDateOnly(date: Date): number {
    if (!date) {
      return null;
    }
    const year = padStart(String(date.getFullYear()), 4, '0');
    const month = padStart(String(date.getMonth()), 2, '0');
    const day = padStart(String(date.getDate()), 2, '0');
    const dateOnly = year + month + day;
    return Number(dateOnly);
  }

  public static fromDateStruct(dateStruct: NgbDateStruct): Date {
    if (!dateStruct) {
      return null;
    }
    return new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day);
  }

  public static toDateStruct(date: Date): NgbDateStruct {
    if (!date) {
      return null;
    }
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  public static getCalendarMonthEvents(tasks: Task[], clients: Client[]): CalendarEvent[] {
    const clientById = keyBy(clients, 'id');
    const eventsByDate: any = {};
    const events: CalendarEvent[] = [];
    tasks.forEach((task) => {
      const client = clientById[task.client];
      const dateIndex = String(CalendarUtils.toDateOnly(task.schedule_date));
      if (!eventsByDate[dateIndex]) {
        eventsByDate[dateIndex] = {};
      }
      let event: CalendarEvent<CalendarEventMeta> = eventsByDate[dateIndex][task.name];
      if (!event) {
        const color = Helpers.getColor(task.name);
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
    return events;
  }

  private constructor() {

  }
}
