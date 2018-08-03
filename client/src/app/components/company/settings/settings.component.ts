import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import findIndex from 'lodash-es/findIndex';

import {SaveInstitutionsComponent} from 'app/components/company/settings/institutions/save/save.component';
import {SavePlanComponent} from 'app/components/company/settings/plan/save/save.component';
import {DeletePlanComponent} from 'app/components/company/settings/plan/delete/delete.component';
import {ColorSelected, PaletteVariant} from 'app/components/custom/material-palette-picker/material-palette-picker.component';

import {CompanyService} from 'app/services/company.service';
import {AlertService} from 'app/services/alert.service';
import {EventService} from 'app/services/event.service';
import {Constants} from 'app/utils/constants';
import {Company} from 'app/models/company.model';
import {Institution} from 'app/models/institution.model';
import {Plan} from 'app/models/plan.model';

@Component({
  selector: 'app-company-settings',
  templateUrl: './settings.component.html',
})
export class CompanySettingsComponent implements OnInit {

  public company: Company;
  public loading = true;
  public selectedPaletteVariant: PaletteVariant;
  public selectedTextColor: string;
  public phonePattern = Constants.PHONE_PATTERN;
  public phoneMask = Constants.PHONE_MASK;

  constructor(private companyService: CompanyService, private alertService: AlertService, private eventService: EventService, private ngbModal: NgbModal) {

  }

  public ngOnInit(): void {
    this.companyService.getCompany({populate: 'plans institutions'}).subscribe((company) => {
      this.company = company;
      this.selectedTextColor = this.company.text_color;
      this.loading = false;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public trackByInstitution(_index: number, institution: Institution): string {
    return institution.name;
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

  public openSaveInstitutions(): void {
    const modalRef = this.ngbModal.open(SaveInstitutionsComponent);
    modalRef.result.then((updatedInstitutions) => {
      this.company.institutions = updatedInstitutions;
    }).catch(() => {
      // Nothing to do...
    });
  }

  public openSavePlan(plan: Plan): void {
    const modalRef = this.ngbModal.open(SavePlanComponent);
    modalRef.componentInstance.plan = plan;
    modalRef.result.then((updatedPlan) => {
      const index = findIndex(this.company.plans, (currentPlan) => {
        return currentPlan.id === updatedPlan.id;
      });
      if (index < 0) {
        this.company.plans.push(updatedPlan);
      } else {
        this.company.plans[index] = updatedPlan;
      }
    }).catch(() => {
      // Nothing to do...
    });
  }

  public openDeletePlan(plan: Plan): void {
    const modalRef = this.ngbModal.open(DeletePlanComponent);
    modalRef.componentInstance.plan = plan;
    modalRef.result.then(() => {
      const index = findIndex(this.company.plans, (currentPlan) => {
        return currentPlan.id === plan.id;
      });
      if (index >= 0) {
        this.company.plans.splice(index, 1);
      }
    }).catch(() => {
      // Nothing to do...
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

  public updateCompanyInfo(): void {
    const data = {
      name: this.company.name,
      contact_email: this.company.contact_email,
      contact_phone: this.company.contact_phone,
      website: this.company.website,
    };
    this.companyService.updateCompany(data).subscribe((company) => {
      this.company = company;
      this.eventService.publish(EventService.EVENT_COMPANY_CHANGED, company);
      this.alertService.success('Configurações atualizadas com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível atualizar as configurações, por favor tente novamente mais tarde!');
    });
  }

  public updateCompanyColors(): void {
    const data = {
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
}
