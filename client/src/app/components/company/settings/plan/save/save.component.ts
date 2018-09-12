import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {PlanService} from '@services/plan.service';
import {AlertService} from '@services/alert.service';
import {Constants} from '@utils/constants';
import {Plan} from '@models/plan.model';

@Component({
  selector: 'app-save-plan',
  templateUrl: './save.component.html',
})
export class SavePlanComponent implements OnInit {

  @Input()
  public plan: Plan;

  public name: string;
  public price: string;
  public currencyMask = Constants.CURRENCY_MASK;
  public loading = true;
  public saving = false;

  constructor(private planService: PlanService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    if (!this.plan) {
      this.plan = new Plan();
      this.loading = false;
      return;
    }
    this.planService.getPlan(this.plan.id).subscribe((plan) => {
      this.plan = plan;
      this.name = this.plan.name;
      this.price = String(this.plan.price);
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

  public createPlan(): void {
    this.saving = true;
    const data = {
      name: this.name,
      price: Number(this.price),
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
