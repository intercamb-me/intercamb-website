import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import values from 'lodash-es/values';

import {TaskService} from 'app/services/task.service';
import {AlertService} from 'app/services/alert.service';
import {Constants} from 'app/utils/constants';
import {Client} from 'app/models/client.model';
import {Task} from 'app/models/task.model';

@Component({
  selector: 'app-change-task-status',
  templateUrl: './change-task-status.component.html',
})
export class ChangeTaskStatusComponent {

  @Input()
  public client: Client;
  @Input()
  public task: Task;
  public taskStatus = values(Constants.TASK_STATUS);

  constructor(private taskService: TaskService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public trackByIndex(index: number): number {
    return index;
  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public changeStatus(status: string): void {
    this.taskService.updateTask(this.task, {status}).subscribe((task) => {
      this.ngbActiveModal.close(task);
      this.alertService.success('Status da atividade atualizado com sucesso!');
    }, (err) => {
      this.close();
      this.alertService.apiError(null, err, 'Não foi possível atualizar o status da atividade, por favor tente novamente mais tarde!');
    });
  }
}
