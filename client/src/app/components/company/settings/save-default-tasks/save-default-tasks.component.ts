import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {CompanyService} from 'app/services/company.service';
import {AlertService} from 'app/services/alert.service';

@Component({
  selector: 'app-save-default-tasks',
  templateUrl: './save-default-tasks.component.html',
})
export class SaveDefaultTasksComponent implements OnInit {

  public defaultTasks: string[];
  public taskName: string;
  public loading = true;
  public saving = false;

  constructor(private companyService: CompanyService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
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

  public trackByDefaultTask(_index: number, defaultTask: string): string {
    return defaultTask;
  }

  public addDefaultTask(): void {
    if (this.taskName) {
      const index = this.defaultTasks.indexOf(this.taskName);
      if (index < 0) {
        this.defaultTasks.push(this.taskName);
      }
      this.taskName = null;
    }
  }

  public removeDefaultTask(defaultTask: string): void {
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
}
