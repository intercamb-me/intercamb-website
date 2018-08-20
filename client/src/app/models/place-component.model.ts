/* tslint:disable:variable-name */

export class PlaceComponent {

  public name: string;
  public short_name: string;

  constructor(data?: any) {
    if (data) {
      this.name = data.name;
      this.short_name = data.short_name;
    }
  }
}
