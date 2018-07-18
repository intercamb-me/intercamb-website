import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {mergeMap} from 'rxjs/operators';
import findIndex from 'lodash-es/findIndex';

import {SavePlanComponent} from 'app/components/company/settings/save-plan/save-plan.component';
import {DeletePlanComponent} from 'app/components/company/settings/delete-plan/delete-plan.component';
import {ColorSelected, PaletteVariant} from 'app/components/custom/material-palette-picker/material-palette-picker.component';

import {CompanyService} from 'app/services/company.service';
import {AlertService} from 'app/services/alert.service';
import {EventService} from 'app/services/event.service';
import {Company} from 'app/models/company.model';
import {Plan} from 'app/models/plan.model';

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
})
export class CompanySettingsComponent implements OnInit {

  public company: Company;
  public plans: Plan[];
  public loading = true;
  public selectedPaletteVariant: PaletteVariant;
  public selectedTextColor: string;

  constructor(private companyService: CompanyService, private alertService: AlertService, private eventService: EventService, private ngbModal: NgbModal) {

  }

  public ngOnInit(): void {
    this.companyService.getCompany().pipe(
      mergeMap((company) => {
        this.company = company;
        this.selectedTextColor = this.company.text_color;
        return this.companyService.listPlans();
      })
    ).subscribe((plans) => {
      this.plans = plans;
      this.loading = false;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public trackByPlan(_index: number, plan: Plan): string {
    return plan.id;
  }

  public onColorSelected(colorSelected: ColorSelected): void {
    const {variant} = colorSelected;
    this.selectedPaletteVariant = variant;
    this.selectedTextColor = variant.textColor;
  }

  public selectTextColor(color: string): void {
    this.selectedTextColor = color;
  }

  public openSavePlan(plan: Plan): void {
    const modalRef = this.ngbModal.open(SavePlanComponent);
    modalRef.componentInstance.plan = plan;
    modalRef.result.then((updatedPlan) => {
      const index = findIndex(this.plans, (currentPlan) => {
        return currentPlan.id === updatedPlan.id;
      });
      if (index < 0) {
        this.plans.push(updatedPlan);
      } else {
        this.plans[index] = updatedPlan;
      }
    }).catch(() => {
      // Nothing to do...
    });
  }

  public openDeletePlan(plan: Plan): void {
    const modalRef = this.ngbModal.open(DeletePlanComponent);
    modalRef.componentInstance.plan = plan;
    modalRef.result.then(() => {
      const index = findIndex(this.plans, (currentPlan) => {
        return currentPlan.id === plan.id;
      });
      if (index >= 0) {
        this.plans.splice(index, 1);
      }
    }).catch(() => {
      // Nothing to do...
    });
  }

  public updateCompany(): void {
    const data = {
      name: this.company.name,
      primary_color: this.selectedPaletteVariant.color,
      text_color: this.selectedTextColor,
    };
    this.companyService.updateCompany(data).subscribe((company) => {
      this.company = company;
      this.eventService.publish(EventService.EVENT_COMPANY_CHANGED, company);
      this.alertService.success('Configurações atualizadas com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível atualizar as configurações, por favor tente novamente mais tarde!');
    });
  }

  public updateCompanyLogo(event: any): void {
    const file = event.target.files[0];
    this.companyService.updateCompanyLogo(file).subscribe((company) => {
      this.company = company;
      this.eventService.publish(EventService.EVENT_COMPANY_CHANGED, company);
      this.alertService.success('Logo atualizado com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível atualizar o logo, por favor tente novamente mais tarde!');
    });
  }
}
