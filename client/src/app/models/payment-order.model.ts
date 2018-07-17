/* tslint:disable:variable-name */

export class PaymentOrder {

  public id: string;
  public company: string;
  public client: string;
  public method: string;
  public amount: string;
  public paid: string;
  public payment_date: Date;
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.company = data.company;
      this.client = data.client;
      this.method = data.method;
      this.amount = data.amount;
      this.paid = data.paid;
      this.payment_date = data.payment_date ? new Date(data.payment_date) : null;
      this.registration_date = new Date(data.registration_date);
    }
  }
}
