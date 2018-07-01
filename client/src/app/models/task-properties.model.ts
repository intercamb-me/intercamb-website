/* tslint:disable:variable-name */

export class TaskProperties {

  public schedulable: boolean;
  public schedule_date: Date;

  constructor(data?: any) {
    if (data) {
      this.schedulable = data.schedulable;
      this.schedule_date = data.schedule_date;
    }
  }
}
