import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {ClientService} from '@services/client.service';
import {AlertService} from '@services/alert.service';
import {Constants} from '@utils/constants';

@Component({
  selector: 'app-search-address',
  templateUrl: './search-address.component.html',
})
export class SearchAddressComponent {

  public zipCode: string;
  public zipCodeMask = Constants.ZIP_CODE_MASK;
  public searching = false;

  constructor(private clientService: ClientService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public searchAddress(): void {
    this.searching = true;
    this.clientService.searchAddress(this.zipCode).subscribe((zipCodeAddress) => {
      this.alertService.success('Endereço encontrado! Os campos foram preenchidos automaticamente.');
      this.ngbActiveModal.close(zipCodeAddress);
    }, (err) => {
      this.searching = false;
      this.alertService.apiError(null, err, 'Não foi possível buscar o endereço, por favor tente novamente mais tarde!');
    });
  }
}
