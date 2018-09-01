/* tslint:disable:variable-name */

import {PlaceComponent} from '@models/place-component.model';
import {PlaceLocation} from '@models/place-location.model';

export class TaskPlace {

  public formatted_address: string;
  public street_number: string;
  public route: string;
  public sublocality: string;
  public admin_area: PlaceComponent;
  public country: PlaceComponent;
  public postal_code: string;
  public postal_code_suffix: string;
  public url: string;
  public location: PlaceLocation;

  constructor(data?: any) {
    if (data) {
      this.formatted_address = data.formatted_address;
      this.street_number = data.street_number;
      this.route = data.route;
      this.sublocality = data.sublocality;
      this.admin_area = new PlaceComponent(data.admin_area);
      this.country = new PlaceComponent(data.country);
      this.postal_code = data.postal_code;
      this.postal_code_suffix = data.postal_code_suffix;
      this.url = data.url;
      this.location = new PlaceLocation(data.location);
    }
  }
}
