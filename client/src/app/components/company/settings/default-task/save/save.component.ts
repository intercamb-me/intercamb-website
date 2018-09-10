import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {DefaultTaskService} from '@services/default-task.service';
import {AlertService} from '@services/alert.service';
import {DefaultTask} from '@models/default-task.model';

@Component({
  selector: 'app-save-default-task',
  templateUrl: './save.component.html',
})
export class SaveDefaultTaskComponent implements OnInit {

  @Input()
  public defaultTask: DefaultTask;
  public loading = true;
  public saving = false;

  constructor(private defaultTaskService: DefaultTaskService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    if (!this.defaultTask) {
      this.defaultTask = new DefaultTask({});
      this.loading = false;
      return;
    }
    this.defaultTaskService.getDefaultTask(this.defaultTask.id).subscribe((defaultTask) => {
      this.defaultTask = defaultTask;
      this.loading = false;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public createDefaultTask(): void {
    if (this.defaultTask.name) {
      this.saving = true;
      this.defaultTaskService.createDefaultTask(this.defaultTask.name).subscribe((defaultTask) => {
        this.defaultTask = defaultTask;
        this.saving = false;
        this.alertService.success('Atividade padrão criada com sucesso!');
      }, (err) => {
        this.saving = false;
        this.alertService.apiError(null, err, 'Não foi possível criar a atividade padrão, por favor tente novamente mais tarde!');
      });
    }
  }

  public updateDefaultTask(): void {
    const data = {
      name: this.defaultTask.name,
      fields: this.defaultTask.fields,
      checklists: this.defaultTask.checklists,
    };
    this.saving = true;
    this.defaultTaskService.updateDefaultTask(this.defaultTask, data).subscribe(() => {
      this.saving = false;
      this.alertService.success('Atividade padrão atualizada com sucesso!');
    }, (err) => {
      this.saving = false;
      this.alertService.apiError(null, err, 'Não foi possível remover a atividade padrão, por favor tente novamente mais tarde!');
    });
  }
}
