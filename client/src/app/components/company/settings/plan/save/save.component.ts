import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';

import {PlanService} from 'app/services/plan.service';
import {AlertService} from 'app/services/alert.service';
import {Plan} from 'app/models/plan.model';

@Component({
  selector: 'app-save-plan',
  templateUrl: './save.component.html',
})
export class SavePlanComponent implements OnInit {

  @Input()
  public plan: Plan;

  constructor(private planService: PlanService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    if (!this.plan) {
      this.plan = new Plan();
    }
  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public createPlan(): void {
    this.planService.createPlan(this.plan.name, this.plan.price).subscribe((plan) => {
      this.ngbActiveModal.close(plan);
      this.alertService.success('Plano cadastrado com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível cadastrar o plano, por favor tente novamente mais tarde!');
    });
  }

  public updatePlan(): void {
    this.planService.updatePlan(this.plan).subscribe((plan) => {
      this.ngbActiveModal.close(plan);
      this.alertService.success('Plano atualizado com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível atualizar o plano, por favor tente novamente mais tarde!');
    });
  }
}
