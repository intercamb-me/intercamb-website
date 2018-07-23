/* tslint:disable:variable-name */

import {CalendarUtils} from 'app/utils/calendar.utils';
import cloneDeep from 'lodash-es/cloneDeep';

export class PaymentOrder {

  public id: string;
  public company: string;
  public client: string;
  public method: string;
  public amount: number;
  public due_date: Date;
  public payment_date: Date;
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.company = data.company;
      this.client = data.client;
      this.method = data.method;
      this.amount = data.amount;
      this.due_date = CalendarUtils.fromDateOnly(data.due_date);
      this.payment_date = CalendarUtils.fromDateOnly(data.payment_date);
      this.registration_date = new Date(data.registration_date);
    }
  }

  public toJSON(): any {
    const json = cloneDeep(this) as any;
    if (json.due_date) {
      json.due_date = CalendarUtils.toDateOnly(json.due_date);
    }
    if (json.payment_date) {
      json.payment_date = CalendarUtils.toDateOnly(json.payment_date);
    }
    return json;
  }
}
