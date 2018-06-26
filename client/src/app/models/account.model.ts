/* tslint:disable:variable-name */

export class Account {

  public id: string;
  public name: string;
  public email: string;
  public icon_url: string;
  public company: string;
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.icon_url = data.icon_url;
      this.company = data.company;
      this.registration_date = data.registration_date;
    }
  }
}
