import {Component, Input, Output, EventEmitter} from '@angular/core';

import {TaskService} from '@services/task.service';
import {AlertService} from '@services/alert.service';
import {Task} from '@models/task.model';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete.component.html',
})
export class DeleteTaskComponent {

  @Input()
  public task: Task;
  @Output()
  public delete = new EventEmitter<void>();

  public deleting = false;

  constructor(private taskService: TaskService, private alertService: AlertService) {

  }

  public deleteTask(): void {
    this.deleting = true;
    this.taskService.deleteTask(this.task).subscribe(() => {
      this.delete.emit();
      this.alertService.success('Atividade removida com sucesso!');
    }, (err) => {
      this.deleting = false;
      this.alertService.apiError(null, err, 'Não foi possível remover a atividade, por favor tente novamente mais tarde!');
    });
  }
}
