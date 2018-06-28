import * as parseDate from 'date-fns/parse';
import * as formatDate from 'date-fns/format';
import * as addMonths from 'date-fns/addMonths';

export class DateUtils {

  private static readonly DATE_ONLY_FORMAT = 'yyyyMMdd';

  public static fromDateOnly(dateOnly: number): Date {
    const date = parseDate(String(dateOnly), DateUtils.DATE_ONLY_FORMAT, new Date());
    return addMonths(date, 1);
  }

  public static toDateOnly(date: Date): number {
    const finalDate = addMonths(date, -1);
    return Number(formatDate(finalDate, DateUtils.DATE_ONLY_FORMAT));
  }

  private constructor() {

  }
}
