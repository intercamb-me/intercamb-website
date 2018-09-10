import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {mergeMap} from 'rxjs/operators';

import {CompanyService} from '@services/company.service';
import {ClientService} from '@services/client.service';
import {AlertService} from '@services/alert.service';
import {Helpers} from '@utils/helpers';
import {Client} from '@models/client.model';
import {Company} from '@models/company.model';
import {Plan} from '@models/plan.model';

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
  public choosing = true;
  public disassociating = false;
  public changing = false;
  public loading = true;
  public saving = false;

  constructor(private companyService: CompanyService, private clientService: ClientService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    this.clientService.getClient(this.client.id, {select: 'plan'}).pipe(
      mergeMap((client) => {
        this.client = client;
        return this.companyService.getCompany({select: 'currency', populate: 'plans'});
      })
    ).subscribe((company) => {
      this.company = company;
      if (this.client.plan_id) {
        this.selectedPlan = company.plans.find((plan) => {
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
    this.saving = true;
    this.clientService.associatePlan(this.client, this.selectedPlan).subscribe(() => {
      this.ngbActiveModal.close(this.selectedPlan);
      this.alertService.success('Plano associado com sucesso!');
    }, (err) => {
      this.saving = false;
      this.alertService.apiError(null, err, 'Não foi possível associar o plano, por favor tente novamente mais tarde!');
    });
  }

  public dissociatePlan(): void {
    this.saving = true;
    this.clientService.dissociatePlan(this.client).subscribe(() => {
      this.ngbActiveModal.close();
      this.alertService.success('Plano desassociado com sucesso!');
    }, (err) => {
      this.saving = false;
      this.alertService.apiError(null, err, 'Não foi possível desassociar o plano, por favor tente novamente mais tarde!');
    });
  }

  public confirmDisassociation(): void {
    this.choosing = false;
    this.disassociating = true;
    this.changing = false;
  }

  public confirmChange(): void {
    this.choosing = false;
    this.disassociating = false;
    this.changing = true;
  }

  public backToPlans(): void {
    this.choosing = true;
    this.disassociating = false;
    this.changing = false;
  }
}
