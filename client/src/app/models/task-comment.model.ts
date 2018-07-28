/* tslint:disable:variable-name */

import {Account} from 'app/models/account.model';
import isObject from 'lodash-es/isObject';

export class TaskComment {

  public id: string;
  public account_id: string;
  public account: Account;
  public text: string;
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.text = data.text;
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
