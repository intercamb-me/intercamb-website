/* tslint:disable:variable-name */

import {Account} from 'app/models/account.model';
import {Company} from 'app/models/company.model';
import isObject from 'lodash-es/isObject';

export class Token {

  public static readonly TYPE_CLIENT_FORM = 'client_form';

  public id: string;
  public creator_id: string;
  public creator: Account;
  public company_id: string;
  public company: Company;
  public identifier: string;
  public type: string;
  public expiration_date: Date;
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.creator_id = data.creator;
      this.identifier = data.identifier;
      this.type = data.type;
      this.expiration_date = new Date(data.expiration_date);
      this.registration_date = new Date(data.registration_date);
      if (isObject(data.creator)) {
        this.creator = new Account(data.creator);
        this.creator_id = this.creator.id;
      } else {
        this.creator_id = data.creator;
      }
      if (isObject(data.company)) {
        this.company = new Company(data.company);
        this.company_id = this.company.id;
      } else {
        this.company_id = data.company;
      }
    }
  }
}
