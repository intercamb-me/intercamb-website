/* tslint:disable:variable-name */

export class TaskAttachment {

  public id: string;
  public account: string;
  public name: string;
  public type: string;
  public size: number;
  public url: string;
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.account = data.account;
      this.name = data.name;
      this.type = data.type;
      this.size = data.size;
      this.url = data.url;
      this.registration_date = data.registration_date;
    }
  }
}
