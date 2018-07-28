/* tslint:disable:variable-name */

export class Plan {

  public id: string;
  public company_id: string;
  public name: string;
  public price: number;
  public registration_date: string;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.company_id = data.company;
      this.name = data.name;
      this.price = data.price;
      this.registration_date = data.registration_date;
    }
  }
}
