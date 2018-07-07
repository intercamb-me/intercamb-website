import padStart from 'lodash-es/padStart';
import * as getYear from 'date-fns/get_year';
import * as getMonth from 'date-fns/get_month';
import * as getDate from 'date-fns/get_date';

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
    console.log(date);
    return date;
  }

  public static toDateOnly(date: Date): number {
    if (!date) {
      return null;
    }
    const year = padStart(String(getYear(date)), 4, '0');
    const month = padStart(String(getMonth(date)), 2, '0');
    const day = padStart(String(getDate(date)), 2, '0');
    const dateOnly = year + month + day;
    console.log(dateOnly);
    return Number(dateOnly);
  }

  private constructor() {

  }
}
