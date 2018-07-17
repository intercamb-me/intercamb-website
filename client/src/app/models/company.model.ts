/* tslint:disable:variable-name */

export class Company {

  public id: string;
  public name: string;
  public logo_url: string;
  public currency: string;
  public primary_color: string;
  public text_color: string;
  public owner: string;
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.logo_url = data.logo_url;
      this.currency = data.currency;
      this.primary_color = data.primary_color;
      this.text_color = data.text_color;
      this.owner = data.owner;
      this.registration_date = new Date(data.registration_date);
    }
  }
}
