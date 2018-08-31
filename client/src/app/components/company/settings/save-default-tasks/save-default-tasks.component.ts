import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbPopover} from '@ng-bootstrap/ng-bootstrap';

import {CompanyService} from 'app/services/company.service';
import {AlertService} from 'app/services/alert.service';
import {DefaultTask} from 'app/models/default-task.model';

@Component({
  selector: 'app-save-default-tasks',
  templateUrl: './save-default-tasks.component.html',
})
export class SaveDefaultTasksComponent implements OnInit {

  @ViewChild(NgbPopover)
  public popover: NgbPopover;

  public defaultTasks: DefaultTask[];
  public selectedDefaultTask: DefaultTask;
  public newDefaultTask: DefaultTask;
  public loading = true;
  public saving = false;

  constructor(private companyService: CompanyService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    this.newDefaultTask = new DefaultTask({});
    this.companyService.getCompany({select: 'default_tasks'}).subscribe((company) => {
      this.defaultTasks = company.default_tasks;
      this.loading = false;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public trackByDefaultTask(_index: number, defaultTask: DefaultTask): string {
    return defaultTask.name;
  }

  public addDefaultTask(): void {
    if (this.newDefaultTask.name) {
      const index = this.defaultTasks.findIndex((defaultTask) => {
        return defaultTask.name === this.newDefaultTask.name;
      });
      if (index < 0) {
        this.defaultTasks.push(this.newDefaultTask);
        this.selectedDefaultTask = this.newDefaultTask;
        this.newDefaultTask = new DefaultTask({});
      }
    }
  }

  public editDefaultTask(defaultTask: DefaultTask): void {
    this.selectedDefaultTask = defaultTask;
  }

  public saveDefaultTask(defaultTask: DefaultTask): void {
    const index = this.defaultTasks.indexOf(this.selectedDefaultTask);
    if (index >= 0) {
      this.defaultTasks[index] = defaultTask;
      this.backToDefaultTasks();
    }
  }

  public removeDefaultTask(defaultTask: DefaultTask): void {
    const index = this.defaultTasks.indexOf(defaultTask);
    if (index >= 0) {
      this.defaultTasks.splice(index, 1);
    }
  }

  public saveDefaultTasks(): void {
    this.saving = true;
    this.companyService.updateCompany({default_tasks: this.defaultTasks}).subscribe(() => {
      this.ngbActiveModal.close(this.defaultTasks);
      this.alertService.success('Atividades padrões atualizadas com sucesso!');
    }, (err) => {
      this.saving = false;
      this.alertService.apiError(null, err, 'Não foi possível atualizar as atividades padrões, por favor tente novamente mais tarde!');
    });
  }

  public backToDefaultTasks(): void {
    this.selectedDefaultTask = null;
  }
}
