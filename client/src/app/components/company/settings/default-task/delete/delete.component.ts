import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {DefaultTaskService} from '@services/default-task.service';
import {AlertService} from '@services/alert.service';
import {DefaultTask} from '@models/default-task.model';

@Component({
  selector: 'app-delete-default-task',
  templateUrl: './delete.component.html',
})
export class DeleteDefaultTaskComponent {

  @Input()
  public defaultTask: DefaultTask;

  public deleting = false;

  constructor(private defaultTaskService: DefaultTaskService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public deleteDefaultTask(): void {
    this.deleting = true;
    this.defaultTaskService.deleteDefaultTask(this.defaultTask).subscribe(() => {
      this.ngbActiveModal.close();
      this.alertService.success('Atividade padrão removida com sucesso!');
    }, (err) => {
      this.deleting = false;
      this.alertService.apiError(null, err, 'Não foi possível remover a atividade padrão, por favor tente novamente mais tarde!');
    });
  }
}
