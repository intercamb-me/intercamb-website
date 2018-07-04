/* tslint:disable:variable-name */

export class TaskProperties {

  public schedule_date: Date;

  constructor(data?: any) {
    if (data) {
      this.schedule_date = data.schedule_date;
    }
  }
}
