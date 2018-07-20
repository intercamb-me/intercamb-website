/* tslint:disable:variable-name */

import {DateUtils} from 'app/utils/date.utils';
import cloneDeep from 'lodash-es/cloneDeep';

export class AdditionalInformation {

  public disabilities: string;
  public arrival_date: Date;
  public how_did_you_know_the_company: string;

  constructor(data?: any) {
    if (data) {
      this.disabilities = data.disabilities;
      this.arrival_date = DateUtils.fromDateOnly(data.arrival_date);
      this.how_did_you_know_the_company = data.how_did_you_know_the_company;
    }
  }

  public toJSON(): any {
    const json = cloneDeep(this) as any;
    if (json.arrival_date) {
      json.arrival_date = DateUtils.toDateOnly(json.arrival_date);
    }
    return json;
  }
}
