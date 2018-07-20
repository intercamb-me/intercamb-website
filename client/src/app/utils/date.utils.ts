import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import padStart from 'lodash-es/padStart';

export class DateUtils {

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

  private constructor() {

  }
}
