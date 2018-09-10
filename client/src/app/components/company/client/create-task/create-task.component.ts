import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {ClientService} from '@services/client.service';
import {AlertService} from '@services/alert.service';
import {Client} from '@models/client.model';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
})
export class CreateTaskComponent {

  @Input()
  public client: Client;

  public name: string;
  public saving = false;

  constructor(private clientService: ClientService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public createTask(): void {
    this.saving = true;
    this.clientService.createTask(this.client, this.name).subscribe((task) => {
      this.ngbActiveModal.close(task);
      this.alertService.success('Atividade criada com sucesso!');
    }, (err) => {
      this.saving = false;
      this.alertService.apiError(null, err, 'Não foi possível criar a atividade, por favor tente novamente mais tarde!');
    });
  }
}
