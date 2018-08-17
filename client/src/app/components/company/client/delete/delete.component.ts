import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {ClientService} from 'app/services/client.service';
import {AlertService} from 'app/services/alert.service';
import {Client} from 'app/models/client.model';

@Component({
  selector: 'app-delete-client',
  templateUrl: './delete.component.html',
})
export class DeleteClientComponent {

  @Input()
  public client: Client;

  public deleting = false;

  constructor(private clientService: ClientService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public deleteClient(): void {
    this.deleting = true;
    this.clientService.deleteClient(this.client).subscribe(() => {
      this.ngbActiveModal.close();
      this.alertService.success('Cliente removido com sucesso!');
    }, (err) => {
      this.deleting = false;
      this.alertService.apiError(null, err, 'Não foi possível remover o cliente, por favor tente novamente mais tarde!');
    });
  }
}
