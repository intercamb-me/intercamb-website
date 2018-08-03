import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';

import {ClientService} from 'app/services/client.service';
import {AlertService} from 'app/services/alert.service';
import {Constants} from 'app/utils/constants';

@Component({
  selector: 'app-search-address',
  templateUrl: './search-address.component.html',
})
export class SearchAddressComponent {

  public zipCode: string;
  public zipCodeMask = Constants.ZIP_CODE_MASK;

  constructor(private clientService: ClientService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public searchAddress(): void {
    this.clientService.searchAddress(this.zipCode).subscribe((zipCodeAddress) => {
      this.alertService.success('Endereço encontrado! Os campos foram preenchidos automaticamente.');
      this.ngbActiveModal.close(zipCodeAddress);
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível buscar o endereço, por favor tente novamente mais tarde!');
    });
  }
}
