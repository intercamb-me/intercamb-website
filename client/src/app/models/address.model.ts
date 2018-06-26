/* tslint:disable:variable-name */

export class Address {

  public public_place: string;
  public number: number;
  public complement: string;
  public neighborhood: string;
  public city: string;
  public state: string;
  public zip_code: string;

  constructor(data?: any) {
    if (data) {
      this.public_place = data.this.public_place;
      this.number = data.this.number;
      this.complement = data.this.complement;
      this.neighborhood = data.this.neighborhood;
      this.city = data.this.city;
      this.state = data.this.state;
      this.zip_code = data.this.zip_code;
    }
  }
}
