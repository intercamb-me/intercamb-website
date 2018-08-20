import {Component, Input, NgZone} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {TaskService} from 'app/services/task.service';
import {AlertService} from 'app/services/alert.service';
import {Task} from 'app/models/task.model';

@Component({
  selector: 'app-set-location',
  templateUrl: './set-location.component.html',
})
export class SetTaskLocationComponent {

  @Input()
  public task: Task;

  public place: any;

  constructor(private taskService: TaskService, private alertService: AlertService, private ngZone: NgZone, private ngbActiveModal: NgbActiveModal) {

  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public selectPlace(place: any): void {
    this.ngZone.run(() => {
      this.place = place;
    });
  }

  public saveLocation(): void {
    this.taskService.updateTask(this.task, {place: this.place}).subscribe((task) => {
      this.ngbActiveModal.close(task);
      this.alertService.success('Localização salva com sucesso!');
    }, (err) => {
      this.close();
      this.alertService.apiError(null, err, 'Não foi possível salvar a localização, por favor tente novamente mais tarde!');
    });
  }

  public removeLocation(): void {
    this.taskService.updateTask(this.task, {place: null}).subscribe((task) => {
      this.ngbActiveModal.close(task);
      this.alertService.success('Localização removida com sucesso!');
    }, (err) => {
      this.close();
      this.alertService.apiError(null, err, 'Não foi possível remover a localização, por favor tente novamente mais tarde!');
    });
  }
}
