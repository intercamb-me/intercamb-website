import {Component, OnInit, Input, EventEmitter} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import {CompanyService} from '@services/company.service';
import {DefaultTaskService} from '@services/default-task.service';
import {AlertService} from '@services/alert.service';
import {Helpers} from '@utils/helpers';
import {DefaultTask} from '@models/default-task.model';
import {Plan} from '@models/plan.model';

@Component({
  selector: 'app-save-default-task',
  templateUrl: './save.component.html',
})
export class SaveDefaultTaskComponent implements OnInit {

  @Input()
  public defaultTask: DefaultTask;
  public changeEmitter = new EventEmitter<DefaultTask>();

  public plans: Plan[];
  public selectedPlan: Plan;
  public getColor = Helpers.getColor;
  public loading = true;
  public saving = false;

  constructor(private companyService: CompanyService, private defaultTaskService: DefaultTaskService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    this.companyService.listPlans({select: 'name'}).pipe(
      mergeMap((plans) => {
        this.plans = plans;
        return this.defaultTask ? this.defaultTaskService.getDefaultTask(this.defaultTask.id) : of(new DefaultTask({}));
      })
    ).subscribe((defaultTask) => {
      this.defaultTask = defaultTask;
      this.loading = false;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public trackByPlan(_index: number, plan: Plan): string {
    return plan.id;
  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public selectPlan(plan: Plan): void {
    if (this.selectedPlan && this.selectedPlan === plan) {
      this.selectedPlan = null;
    } else {
      this.selectedPlan = plan;
    }
  }

  public createDefaultTask(): void {
    if (this.defaultTask.name) {
      const data = {
        name: this.defaultTask.name,
        plan: this.selectedPlan ? this.selectedPlan.id : undefined,
      };
      this.saving = true;
      this.defaultTaskService.createDefaultTask(data).subscribe((defaultTask) => {
        this.defaultTask = defaultTask;
        this.changeEmitter.emit(this.defaultTask);
        this.saving = false;
        this.alertService.success('Atividade padrão criada com sucesso!');
      }, (err) => {
        this.saving = false;
        this.alertService.apiError(null, err, 'Não foi possível criar a atividade padrão, por favor tente novamente mais tarde!');
      });
    }
  }

  public onDefaultTaskUpdate(defaultTask: DefaultTask): void {
    this.defaultTask = defaultTask;
    this.changeEmitter.emit(this.defaultTask);
  }
}
