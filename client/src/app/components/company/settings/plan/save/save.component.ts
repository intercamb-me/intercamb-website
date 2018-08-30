import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {PlanService} from 'app/services/plan.service';
import {AlertService} from 'app/services/alert.service';
import {Constants} from 'app/utils/constants';
import {DefaultTask} from 'app/models/default-task.model';
import {Plan} from 'app/models/plan.model';

@Component({
  selector: 'app-save-plan',
  templateUrl: './save.component.html',
})
export class SavePlanComponent implements OnInit {

  @Input()
  public plan: Plan;

  public name: string;
  public price: string;
  public defaultTasks: DefaultTask[];
  public selectedDefaultTask: DefaultTask;
  public newDefaultTask: DefaultTask;
  public currencyMask = Constants.CURRENCY_MASK;
  public loading = true;
  public saving = false;

  constructor(private planService: PlanService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    this.newDefaultTask = new DefaultTask();
    if (!this.plan) {
      this.plan = new Plan();
      this.defaultTasks = [];
      this.loading = false;
      return;
    }
    this.planService.getPlan(this.plan.id).subscribe((plan) => {
      this.plan = plan;
      this.name = this.plan.name;
      this.price = String(this.plan.price);
      this.defaultTasks = this.plan.default_tasks;
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
    if (this.newDefaultTask.name) {
      const index = this.defaultTasks.findIndex((defaultTask) => {
        return defaultTask.name === this.newDefaultTask.name;
      });
      if (index < 0) {
        this.defaultTasks.push(this.newDefaultTask);
        this.selectedDefaultTask = this.newDefaultTask;
        this.newDefaultTask = new DefaultTask();
      }
    }
  }

  public editDefaultTask(defaultTask: DefaultTask): void {
    this.selectedDefaultTask = defaultTask;
  }

  public removeDefaultTask(defaultTask: DefaultTask): void {
    const index = this.defaultTasks.indexOf(defaultTask);
    if (index >= 0) {
      this.defaultTasks.splice(index, 1);
    }
  }

  public saveDefaultTask(defaultTask: DefaultTask): void {
    this.selectedDefaultTask.checklists = defaultTask.checklists;
    this.backToDefaultTasks();
  }

  public backToDefaultTasks(): void {
    this.selectedDefaultTask = null;
  }

  public createPlan(): void {
    this.saving = true;
    const data = {
      name: this.name,
      price: Number(this.price),
      default_tasks: this.defaultTasks,
    };
    this.planService.createPlan(data).subscribe((plan) => {
      this.ngbActiveModal.close(plan);
      this.alertService.success('Plano cadastrado com sucesso!');
    }, (err) => {
      this.saving = false;
      this.alertService.apiError(null, err, 'Não foi possível cadastrar o plano, por favor tente novamente mais tarde!');
    });
  }

  public updatePlan(): void {
    this.saving = true;
    const data = {
      name: this.name,
      price: Number(this.price),
      default_tasks: this.defaultTasks,
    };
    this.planService.updatePlan(this.plan, data).subscribe((plan) => {
      this.ngbActiveModal.close(plan);
      this.alertService.success('Plano atualizado com sucesso!');
    }, (err) => {
      this.saving = false;
      this.alertService.apiError(null, err, 'Não foi possível atualizar o plano, por favor tente novamente mais tarde!');
    });
  }
}
