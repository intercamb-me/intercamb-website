import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';

import {PlanService} from 'app/services/plan.service';
import {AlertService} from 'app/services/alert.service';
import {Plan} from 'app/models/plan.model';

@Component({
  selector: 'app-delete-plan',
  templateUrl: './delete.component.html',
})
export class DeletePlanComponent {

  @Input()
  public plan: Plan;

  constructor(private planService: PlanService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public deletePlan(): void {
    this.planService.deletePlan(this.plan).subscribe(() => {
      this.ngbActiveModal.close();
      this.alertService.success('Plano removido com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível remover o plano, por favor tente novamente mais tarde!');
    });
  }
}
