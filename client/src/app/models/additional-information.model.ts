/* tslint:disable:variable-name */

import {DateUtils} from 'app/utils/date.utils';
import cloneDeep from 'lodash-es/cloneDeep';

export class AdditionalInformation {

  public disabilities: string;
  public arrival_date: Date;

  constructor(data?: any) {
    if (data) {
      this.disabilities = data.disabilities;
      this.arrival_date = DateUtils.fromDateOnly(data.arrival_date);
    }
  }

  public toJSON(): any {
    const json = cloneDeep(this) as any;
    json.arrival_date = DateUtils.toDateOnly(json.arrival_date);
    if (!json.arrival_date) {
      delete json.arrival_date;
    }
    return json;
  }
}
