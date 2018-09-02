import {Component, Input, Output, EventEmitter, NgZone} from '@angular/core';

import {TaskService} from '@services/task.service';
import {AlertService} from '@services/alert.service';
import {Task} from '@models/task.model';

@Component({
  selector: 'app-set-task-location',
  templateUrl: './set-location.component.html',
})
export class SetTaskLocationComponent {

  @Input()
  public task: Task;
  @Output()
  public update = new EventEmitter<Task>();

  public place: any;
  public updating = false;

  constructor(private taskService: TaskService, private alertService: AlertService, private ngZone: NgZone) {

  }

  public selectPlace(place: any): void {
    this.ngZone.run(() => {
      this.place = place;
    });
  }

  public saveLocation(): void {
    this.updating = true;
    this.taskService.updateTask(this.task, {place: this.place}).subscribe((task) => {
      this.update.emit(task);
      this.alertService.success('Localização salva com sucesso!');
    }, (err) => {
      this.updating = false;
      this.alertService.apiError(null, err, 'Não foi possível salvar a localização, por favor tente novamente mais tarde!');
    });
  }

  public removeLocation(): void {
    this.updating = true;
    this.taskService.updateTask(this.task, {place: null}).subscribe((task) => {
      this.update.emit(task);
      this.alertService.success('Localização removida com sucesso!');
    }, (err) => {
      this.updating = false;
      this.alertService.apiError(null, err, 'Não foi possível remover a localização, por favor tente novamente mais tarde!');
    });
  }
}
