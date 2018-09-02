import {Component, Input, Output, EventEmitter} from '@angular/core';

import {TaskService} from '@services/task.service';
import {AlertService} from '@services/alert.service';
import {Constants} from '@utils/constants';
import {Task} from '@models/task.model';

@Component({
  selector: 'app-change-task-status',
  templateUrl: './change-status.component.html',
})
export class ChangeTaskStatusComponent {

  @Input()
  public task: Task;
  @Output()
  public update = new EventEmitter<Task>();

  public taskStatus = Object.values(Constants.TASK_STATUS);

  constructor(private taskService: TaskService, private alertService: AlertService) {

  }

  public trackByIndex(index: number): number {
    return index;
  }

  public changeStatus(status: string): void {
    this.taskService.updateTask(this.task, {status}).subscribe((task) => {
      this.update.emit(task);
      this.alertService.success('Status da atividade atualizado com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível atualizar o status da atividade, por favor tente novamente mais tarde!');
    });
  }
}
