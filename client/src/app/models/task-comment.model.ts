/* tslint:disable:variable-name */

export class TaskComment {

  public id: string;
  public account: string;
  public text: string;
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.account = data.account;
      this.text = data.text;
      this.registration_date = new Date(data.registration_date);
    }
  }
}
