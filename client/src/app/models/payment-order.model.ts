/* tslint:disable:variable-name */

import {CalendarUtils} from '@utils/calendar.utils';
import {Client} from '@models/client.model';
import {Company} from '@models/company.model';
import isObject from 'lodash-es/isObject';
import cloneDeep from 'lodash-es/cloneDeep';

export class PaymentOrder {

  public id: string;
  public company_id: string;
  public company: Company;
  public client_id: string;
  public client: Client;
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
      if (isObject(data.company)) {
        this.company = new Company(data.company);
        this.company_id = this.company.id;
      } else {
        this.company_id = data.company;
      }
      if (isObject(data.client)) {
        this.client = new Client(data.client);
        this.client_id = this.client.id;
      } else {
        this.client_id = data.client;
      }
    }
  }

  public toJSON(): any {
    const json = cloneDeep(this) as any;
    json.company = json.company_id;
    delete json.company_id;
    json.client = json.client_id;
    delete json.client_id;
    if (json.due_date) {
      json.due_date = CalendarUtils.toDateOnly(json.due_date);
    }
    if (json.payment_date) {
      json.payment_date = CalendarUtils.toDateOnly(json.payment_date);
    }
    return json;
  }
}
