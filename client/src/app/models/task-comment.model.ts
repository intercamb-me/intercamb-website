/* tslint:disable:variable-name */

import {Account} from '@models/account.model';
import isObject from 'lodash-es/isObject';
import cloneDeep from 'lodash-es/cloneDeep';

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

  public toJSON(): any {
    const json = cloneDeep(this) as any;
    json.account = json.account_id;
    delete json.account_id;
    return json;
  }
}
