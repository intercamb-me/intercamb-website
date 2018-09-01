import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent} from 'angular-calendar';
import padStart from 'lodash-es/padStart';
import isNull from 'lodash-es/isNull';
import isUndefined from 'lodash-es/isUndefined';

import {Helpers} from '@utils/helpers';
import {Task} from '@models/task.model';

interface CalendarEventMeta {
  tasks: Task[];
}

export class CalendarUtils {

  public static fromDateOnly(dateOnly: number): Date {
    if (isNull(dateOnly)) {
      return null;
    }
    if (isUndefined(dateOnly)) {
      return undefined;
    }
    const dateOnlyStr = String(dateOnly);
    const year = dateOnlyStr.substring(0, 4);
    const month = dateOnlyStr.substring(4, 6);
    const day = dateOnlyStr.substring(6, 8);
    const date = new Date(Number(year), Number(month), Number(day));
    return date;
  }

  public static toDateOnly(date: Date): number {
    if (isNull(date)) {
      return null;
    }
    if (isUndefined(date)) {
      return undefined;
    }
    const year = padStart(String(date.getFullYear()), 4, '0');
    const month = padStart(String(date.getMonth()), 2, '0');
    const day = padStart(String(date.getDate()), 2, '0');
    const dateOnly = year + month + day;
    return Number(dateOnly);
  }

  public static fromDateStruct(dateStruct: NgbDateStruct): Date {
    if (isNull(dateStruct)) {
      return null;
    }
    if (isUndefined(dateStruct)) {
      return undefined;
    }
    return new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day);
  }

  public static toDateStruct(date: Date): NgbDateStruct {
    if (isNull(date)) {
      return null;
    }
    if (isUndefined(date)) {
      return undefined;
    }
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  public static getCalendarMonthEvents(tasks: Task[]): CalendarEvent[] {
    const eventsByDate: any = {};
    const events: CalendarEvent[] = [];
    tasks.forEach((task) => {
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
            tasks: [],
          },
        };
        eventsByDate[dateIndex][task.name] = event;
        events.push(event);
      }
      event.meta.tasks.push(task);
    });
    return events;
  }

  private constructor() {

  }
}
