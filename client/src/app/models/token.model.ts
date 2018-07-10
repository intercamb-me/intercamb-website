/* tslint:disable:variable-name */

export class Token {

  public id: string;
  public creator: string;
  public company: string;
  public identifier: string;
  public type: string;
  public code: string;
  public expiration_date: Date;
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.creator = data.creator;
      this.company = data.company;
      this.identifier = data.identifier;
      this.type = data.type;
      this.code = data.code;
      this.expiration_date = new Date(data.expiration_date);
      this.registration_date = new Date(data.registration_date);
    }
  }
}
