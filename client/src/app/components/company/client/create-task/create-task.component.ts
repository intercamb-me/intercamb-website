import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {ClientService} from 'app/services/client.service';
import {AlertService} from 'app/services/alert.service';
import {Client} from 'app/models/client.model';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
})
export class CreateTaskComponent {

  @Input()
  public client: Client;

  public name: string;
  public creating = false;

  constructor(private clientService: ClientService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public createTask(): void {
    this.creating = true;
    this.clientService.createTask(this.client, this.name).subscribe((task) => {
      this.ngbActiveModal.close(task);
      this.alertService.success('Atividade criada com sucesso!');
    }, (err) => {
      this.creating = false;
      this.alertService.apiError(null, err, 'Não foi possível criar a atividade, por favor tente novamente mais tarde!');
    });
  }
}
