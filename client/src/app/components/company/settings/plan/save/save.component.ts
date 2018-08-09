import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';

import {PlanService} from 'app/services/plan.service';
import {AlertService} from 'app/services/alert.service';
import {Constants} from 'app/utils/constants';
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
  public currencyMask = Constants.CURRENCY_MASK;
  public saving = false;

  constructor(private planService: PlanService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    if (!this.plan) {
      this.plan = new Plan();
    }
    this.name = this.plan.name;
    this.price = String(this.plan.price);
  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public createPlan(): void {
    this.saving = true;
    this.planService.createPlan(this.name, Number(this.price)).subscribe((plan) => {
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
