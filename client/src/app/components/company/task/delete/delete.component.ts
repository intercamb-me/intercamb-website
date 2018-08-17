import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {TaskService} from 'app/services/task.service';
import {AlertService} from 'app/services/alert.service';
import {Task} from 'app/models/task.model';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete.component.html',
})
export class DeleteTaskComponent {

  @Input()
  public task: Task;

  public deleting = false;

  constructor(private taskService: TaskService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public deleteTask(): void {
    this.deleting = true;
    this.taskService.deleteTask(this.task).subscribe(() => {
      this.ngbActiveModal.close();
      this.alertService.success('Atividade removida com sucesso!');
    }, (err) => {
      this.deleting = false;
      this.alertService.apiError(null, err, 'Não foi possível remover a atividade, por favor tente novamente mais tarde!');
    });
  }
}
