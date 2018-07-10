/* tslint:disable:variable-name */

import {Company} from 'app/models/company.model';
import isObject from 'lodash-es/isObject';

export class Token {

  public static readonly TYPE_CLIENT_FORM = 'client_form';

  public id: string;
  public creator: string;
  public company: string | Company;
  public identifier: string;
  public type: string;
  public expiration_date: Date;
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.creator = data.creator;
      this.company = isObject(data.company) ? new Company(data.company) : data.company;
      this.identifier = data.identifier;
      this.type = data.type;
      this.expiration_date = new Date(data.expiration_date);
      this.registration_date = new Date(data.registration_date);
    }
  }
}
