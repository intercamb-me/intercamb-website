import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {mergeMap} from 'rxjs/operators';
import find from 'lodash-es/find';

import {CompanyService} from 'app/services/company.service';
import {ClientService} from 'app/services/client.service';
import {AlertService} from 'app/services/alert.service';
import {Company} from 'app/models/company.model';
import {Client} from 'app/models/client.model';
import {Plan} from 'app/models/plan.model';

@Component({
  selector: 'app-associate-plan',
  templateUrl: './associate-plan.component.html',
})
export class AssociatePlanComponent implements OnInit {

  @Input()
  public client: Client;
  public company: Company;
  public plans: Plan[];
  public selectedPlan: Plan;
  public loading = true;

  constructor(private companyService: CompanyService, private clientService: ClientService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    this.companyService.getCompany().pipe(
      mergeMap((company) => {
        this.company = company;
        return this.companyService.listPlans();
      })
    ).subscribe((plans) => {
      this.plans = plans;
      if (this.client.plan) {
        this.selectedPlan = find(plans, (plan) => {
          return plan.id === this.client.plan;
        });
      }
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
    this.selectedPlan = plan;
  }

  public associatePlan(): void {
    this.clientService.associatePlan(this.client, this.selectedPlan).subscribe(() => {
      this.ngbActiveModal.close(this.selectedPlan);
      this.alertService.success('Plano associado com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível associar o plano, por favor tente novamente mais tarde!');
    });
  }

  public dissociatePlan(): void {
    this.clientService.dissociatePlan(this.client).subscribe(() => {
      this.ngbActiveModal.close();
      this.alertService.success('Plano desassociado com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível desassociar o plano, por favor tente novamente mais tarde!');
    });
  }
}
