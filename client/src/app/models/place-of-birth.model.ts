/* tslint:disable:variable-name */

export class PlaceOfBirth {

  public city: string;
  public state: string;

  constructor(data?: any) {
    if (data) {
      this.city = data.city;
      this.state = data.state;
    }
  }
}
