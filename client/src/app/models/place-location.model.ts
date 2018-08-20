/* tslint:disable:variable-name */

export class PlaceLocation {

  public lat: number;
  public lng: number;

  constructor(data?: any) {
    if (data) {
      this.lat = data.lat;
      this.lng = data.lng;
    }
  }
}
