import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {TaskService} from '@services/task.service';
import {AlertService} from '@services/alert.service';
import {Constants} from '@utils/constants';
import {Task} from '@models/task.model';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
})
export class ChangeTaskStatusComponent {

  @Input()
  public task: Task;

  public taskStatus = Object.values(Constants.TASK_STATUS);

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
