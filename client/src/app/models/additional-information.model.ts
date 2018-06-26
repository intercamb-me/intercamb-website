/* tslint:disable:variable-name */

export class AdditionalInformation {

  public disabilities: string;
  public arrival_date: string;

  constructor(data?: any) {
    if (data) {
      this.disabilities = data.disabilities;
      this.arrival_date = data.arrival_date;
    }
  }
}
