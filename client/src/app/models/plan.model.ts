/* tslint:disable:variable-name */

export class Plan {

  public id: string;
  public company: string;
  public name: string;
  public price: number;
  public currency: string;
  public registration_date: string;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.company = data.company;
      this.name = data.name;
      this.price = data.price;
      this.currency = data.currency;
      this.registration_date = data.registration_date;
    }
  }
}
