/* tslint:disable:variable-name */

export class Company {

  public id: string;
  public name: string;
  public logo_url: string;
  public owner: string;
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.logo_url = data.logo_url;
      this.owner = data.owner;
      this.registration_date = data.registration_date;
    }
  }
}
