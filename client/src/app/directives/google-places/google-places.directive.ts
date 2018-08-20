import {Directive, OnInit, Output, ElementRef, EventEmitter} from '@angular/core';

@Directive({
  selector: '[appGooglePlaces]',
})
export class GooglePlacesDirective implements OnInit {

  @Output()
  public selectPlace = new EventEmitter<any>();

  constructor(private elementRef: ElementRef) {

  }

  public ngOnInit(): void {
    const autocomplete = new google.maps.places.Autocomplete(this.elementRef.nativeElement);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      this.selectPlace.emit(this.getPlace(autocomplete.getPlace()));
    });
  }

  private getPlace(place: google.maps.places.PlaceResult): any {
    const location: any = {
      formatted_address: place.formatted_address,
      url: place.url,
      location: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      },
      admin_area: {},
      country: {},
    };
    for (const field in place.address_components) {
      if (place.address_components.hasOwnProperty(field)) {
        const item = place.address_components[field];
        if (item.types.indexOf('street_number') >= 0) {
          location.street_number = item.short_name;
        } else if (item.types.indexOf('route') >= 0) {
          location.route = item.long_name;
        } else if (item.types.indexOf('sublocality_level_1') >= 0) {
          location.sublocality = item.long_name;
        } else if (item.types.indexOf('locality') >= 0) {
          location.locality = item.long_name;
        } else if (item.types.indexOf('administrative_area_level_1') >= 0) {
          location.admin_area.name = item.long_name;
          location.admin_area.short_name = item.short_name;
        } else if (item.types.indexOf('country') >= 0) {
          location.country.name = item.long_name;
          location.country.short_name = item.short_name;
        } else if (item.types.indexOf('postal_code') >= 0) {
          location.postal_code = item.long_name;
        } else if (item.types.indexOf('postal_code_suffix') >= 0) {
          location.postal_code_suffix = item.long_name;
        }
      }
    }
    return location;
  }
}
