/* tslint:disable:variable-name */

import {Account} from 'app/models/account.model';
import isObject from 'lodash-es/isObject';

export class TaskAttachment {

  public id: string;
  public account_id: string;
  public account: Account;
  public name: string;
  public type: string;
  public size: number;
  public url: string;
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.type = data.type;
      this.size = data.size;
      this.url = data.url;
      this.registration_date = new Date(data.registration_date);
      if (isObject(data.account)) {
        this.account = new Account(data.account);
        this.account_id = this.account.id;
      } else {
        this.account_id = data.account;
      }
    }
  }
}
