/* tslint:disable:variable-name */

import {Account} from '@models/account.model';
import {Company} from '@models/company.model';
import isObject from 'lodash-es/isObject';
import cloneDeep from 'lodash-es/cloneDeep';

export class Token {

  public static readonly TYPE_CLIENT_FORM = 'client_form';

  public id: string;
  public company_id: string;
  public company: Company;
  public account_id: string;
  public account: Account;
  public identifier: string;
  public type: string;
  public expiration_date: Date;
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.account_id = data.account;
      this.identifier = data.identifier;
      this.type = data.type;
      this.expiration_date = new Date(data.expiration_date);
      this.registration_date = new Date(data.registration_date);
      if (isObject(data.company)) {
        this.company = new Company(data.company);
        this.company_id = this.company.id;
      } else {
        this.company_id = data.company;
      }
      if (isObject(data.account)) {
        this.account = new Account(data.account);
        this.account_id = this.account.id;
      } else {
        this.account_id = data.account;
      }
    }
  }

  public toJSON(): any {
    const json = cloneDeep(this) as any;
    json.company = json.company_id;
    delete json.company_id;
    json.account = json.account_id;
    delete json.account_id;
    return json;
  }
}
