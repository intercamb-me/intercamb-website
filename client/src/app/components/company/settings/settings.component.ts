import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {mergeMap} from 'rxjs/operators';

import {RemoveAccountComponent} from 'app/components/company/settings/remove-account/remove-account.component';
import {SaveDefaultTasksComponent} from 'app/components/company/settings/save-default-tasks/save-default-tasks.component';
import {SaveInstitutionsComponent} from 'app/components/company/settings/save-institutions/save-institutions.component';
import {SavePlanComponent} from 'app/components/company/settings/plan/save/save.component';
import {DeletePlanComponent} from 'app/components/company/settings/plan/delete/delete.component';
import {InvitationComponent} from 'app/components/company/settings/invitation/invitation.component';
import {ColorSelected, PaletteVariant} from 'app/components/custom/material-palette-picker/material-palette-picker.component';

import {AccountService} from 'app/services/account.service';
import {CompanyService} from 'app/services/company.service';
import {AlertService} from 'app/services/alert.service';
import {EventService} from 'app/services/event.service';
import {Constants} from 'app/utils/constants';
import {Helpers} from 'app/utils/helpers';
import {Account} from 'app/models/account.model';
import {Company} from 'app/models/company.model';
import {DefaultTask} from 'app/models/default-task.model';
import {Institution} from 'app/models/institution.model';
import {Plan} from 'app/models/plan.model';

@Component({
  selector: 'app-company-settings',
  templateUrl: './settings.component.html',
})
export class CompanySettingsComponent implements OnInit {

  public company: Company;
  public authenticatedAccount: Account;
  public accounts: Account[];
  public defaultTasks: DefaultTask[];
  public institutions: Institution[];
  public plans: Plan[];
  public selectedPaletteVariant: PaletteVariant;
  public selectedTextColor: string;
  public getColor = Helpers.getColor;
  public phonePattern = Constants.PHONE_PATTERN;
  public phoneMask = Constants.PHONE_MASK;
  public loading = true;
  public updating = false;

  constructor(private accountService: AccountService, private companyService: CompanyService, private alertService: AlertService, private eventService: EventService, private ngbModal: NgbModal) {

  }

  public ngOnInit(): void {
    this.companyService.getCompany({populate: 'institutions plans accounts'}).pipe(
      mergeMap((company) => {
        this.company = company;
        this.accounts = company.accounts;
        this.defaultTasks = company.default_tasks;
        this.institutions = company.institutions;
        this.plans = company.plans;
        return this.accountService.getAccount();
      })
    ).subscribe((account) => {
      this.authenticatedAccount = account;
      this.loading = false;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public trackByAccount(_index: number, account: Account): string {
    return account.id;
  }

  public trackByDefaultTask(_index: number, defaultTask: string): string {
    return defaultTask;
  }

  public trackByInstitution(_index: number, institution: Institution): string {
    return institution.id;
  }

  public trackByPlan(_index: number, plan: Plan): string {
    return plan.id;
  }

  public onColorSelected(colorSelected: ColorSelected): void {
    const {variant} = colorSelected;
    this.selectedPaletteVariant = variant;
    this.selectedTextColor = this.selectedTextColor ? variant.textColor : this.company.text_color;
  }

  public selectTextColor(color: string): void {
    this.selectedTextColor = color;
  }

  public openRemoveAccount(account: Account): void {
    const modalRef = this.ngbModal.open(RemoveAccountComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.account = account;
    modalRef.result.then(() => {
      const index = this.accounts.findIndex((currentAccount) => {
        return currentAccount.id === account.id;
      });
      if (index >= 0) {
        this.accounts.splice(index, 1);
      }
    }).catch(() => {
      // Nothing to do...
    });
  }

  public openSaveInstitutions(): void {
    const modalRef = this.ngbModal.open(SaveInstitutionsComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.result.then((updatedInstitutions) => {
      this.institutions = updatedInstitutions;
    }).catch(() => {
      // Nothing to do...
    });
  }

  public openSaveDefaultTasks(): void {
    const modalRef = this.ngbModal.open(SaveDefaultTasksComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.result.then((defaultTasks) => {
      this.defaultTasks = defaultTasks;
    }).catch(() => {
      // Nothing to do...
    });
  }

  public openSavePlan(plan: Plan): void {
    const modalRef = this.ngbModal.open(SavePlanComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.plan = plan;
    modalRef.result.then((updatedPlan) => {
      const index = this.plans.findIndex((currentPlan) => {
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
    const modalRef = this.ngbModal.open(DeletePlanComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.plan = plan;
    modalRef.result.then(() => {
      const index = this.plans.findIndex((currentPlan) => {
        return currentPlan.id === plan.id;
      });
      if (index >= 0) {
        this.plans.splice(index, 1);
      }
    }).catch(() => {
      // Nothing to do...
    });
  }

  public openInvitation(): void {
    this.ngbModal.open(InvitationComponent, {
      backdrop: 'static',
      keyboard: false,
    });
  }

  public updateCompanyLogo(event: any): void {
    this.updating = true;
    const file = event.target.files[0];
    this.companyService.updateCompanyLogo(file).subscribe((company) => {
      this.company = company;
      this.updating = false;
      this.eventService.publish(EventService.EVENT_COMPANY_CHANGED, company);
      this.alertService.success('Logo atualizado com sucesso!');
    }, (err) => {
      this.updating = false;
      this.alertService.apiError(null, err, 'Não foi possível atualizar o logo, por favor tente novamente mais tarde!');
    });
  }

  public updateCompanyInfo(): void {
    this.updating = true;
    const data = {
      name: this.company.name,
      contact_email: this.company.contact_email,
      contact_phone: this.company.contact_phone,
      website: this.company.website,
    };
    this.companyService.updateCompany(data).subscribe((company) => {
      this.company = company;
      this.updating = false;
      this.eventService.publish(EventService.EVENT_COMPANY_CHANGED, company);
      this.alertService.success('Configurações atualizadas com sucesso!');
    }, (err) => {
      this.updating = false;
      this.alertService.apiError(null, err, 'Não foi possível atualizar as configurações, por favor tente novamente mais tarde!');
    });
  }

  public updateCompanyColors(): void {
    this.updating = true;
    const data = {
      primary_color: this.selectedPaletteVariant.color,
      text_color: this.selectedTextColor,
    };
    this.companyService.updateCompany(data).subscribe((company) => {
      this.company = company;
      this.updating = false;
      this.eventService.publish(EventService.EVENT_COMPANY_CHANGED, company);
      this.alertService.success('Configurações atualizadas com sucesso!');
    }, (err) => {
      this.updating = false;
      this.alertService.apiError(null, err, 'Não foi possível atualizar as configurações, por favor tente novamente mais tarde!');
    });
  }
}
