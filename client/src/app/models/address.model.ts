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
      this.public_place = data.public_place;
      this.number = data.number;
      this.complement = data.complement;
      this.neighborhood = data.neighborhood;
      this.city = data.city;
      this.state = data.state;
      this.zip_code = data.zip_code;
    }
  }
}
