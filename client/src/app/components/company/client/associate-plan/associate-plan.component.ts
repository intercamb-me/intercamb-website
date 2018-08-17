import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import find from 'lodash-es/find';

import {CompanyService} from 'app/services/company.service';
import {ClientService} from 'app/services/client.service';
import {AlertService} from 'app/services/alert.service';
import {Helpers} from 'app/utils/helpers';
import {Client} from 'app/models/client.model';
import {Company} from 'app/models/company.model';
import {Plan} from 'app/models/plan.model';

@Component({
  selector: 'app-associate-plan',
  templateUrl: './associate-plan.component.html',
})
export class AssociatePlanComponent implements OnInit {

  @Input()
  public client: Client;
  public company: Company;
  public selectedPlan: Plan;
  public getColor = Helpers.getColor;
  public loading = true;
  public updating = false;

  constructor(private companyService: CompanyService, private clientService: ClientService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    this.companyService.getCompany({populate: 'plans'}).subscribe((company) => {
      this.company = company;
      if (this.client.plan_id) {
        this.selectedPlan = find(company.plans, (plan) => {
          return plan.id === this.client.plan_id;
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
    this.updating = true;
    this.clientService.associatePlan(this.client, this.selectedPlan).subscribe(() => {
      this.ngbActiveModal.close(this.selectedPlan);
      this.alertService.success('Plano associado com sucesso!');
    }, (err) => {
      this.updating = false;
      this.alertService.apiError(null, err, 'Não foi possível associar o plano, por favor tente novamente mais tarde!');
    });
  }

  public dissociatePlan(): void {
    this.updating = true;
    this.clientService.dissociatePlan(this.client).subscribe(() => {
      this.ngbActiveModal.close();
      this.alertService.success('Plano desassociado com sucesso!');
    }, (err) => {
      this.updating = false;
      this.alertService.apiError(null, err, 'Não foi possível desassociar o plano, por favor tente novamente mais tarde!');
    });
  }
}
