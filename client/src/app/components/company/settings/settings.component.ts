import {Component, OnInit, EventEmitter} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {mergeMap} from 'rxjs/operators';
import groupBy from 'lodash-es/groupBy';
import keyBy from 'lodash-es/keyBy';

import {RemoveAccountComponent} from '@components/company/settings/remove-account/remove-account.component';
import {SaveInstitutionsComponent} from '@components/company/settings/save-institutions/save-institutions.component';
import {SaveMessageTemplateComponent} from '@components/company/settings/message-template/save/save.component';
import {DeleteMessageTemplateComponent} from '@components/company/settings/message-template/delete/delete.component';
import {SaveDefaultTaskComponent} from '@components/company/settings/default-task/save/save.component';
import {DeleteDefaultTaskComponent} from '@components/company/settings/default-task/delete/delete.component';
import {SavePlanComponent} from '@components/company/settings/plan/save/save.component';
import {DeletePlanComponent} from '@components/company/settings/plan/delete/delete.component';
import {InvitationComponent} from '@components/company/settings/invitation/invitation.component';
import {ColorSelected, PaletteVariant} from '@components/shared/material-palette-picker/material-palette-picker.component';

import {AccountService} from '@services/account.service';
import {CompanyService} from '@services/company.service';
import {AlertService} from '@services/alert.service';
import {EventService} from '@services/event.service';
import {Constants} from '@utils/constants';
import {Helpers} from '@utils/helpers';
import {Dictionary} from '@utils/dictionary';
import {Account} from '@models/account.model';
import {Company} from '@models/company.model';
import {MessageTemplate} from '@models/message-template.model';
import {DefaultTask} from '@models/default-task.model';
import {Institution} from '@models/institution.model';
import {Plan} from '@models/plan.model';

@Component({
  selector: 'app-company-settings',
  templateUrl: './settings.component.html',
})
export class CompanySettingsComponent implements OnInit {

  public company: Company;
  public authenticatedAccount: Account;
  public accounts: Account[];
  public messageTemplates: MessageTemplate[];
  public defaultTasks: DefaultTask[];
  public defaultTasksByPlan: Dictionary<DefaultTask[]>;
  public institutions: Institution[];
  public plans: Plan[];
  public planById: Dictionary<Plan>;
  public selectedPaletteVariant: PaletteVariant;
  public selectedTextColor: string;
  public getColor = Helpers.getColor;
  public phonePattern = Constants.PHONE_PATTERN;
  public phoneMask = Constants.PHONE_MASK;
  public loading = true;
  public saving = false;

  constructor(private accountService: AccountService, private companyService: CompanyService, private alertService: AlertService, private eventService: EventService, private ngbModal: NgbModal) {

  }

  public ngOnInit(): void {
    this.companyService.getCompany({populate: 'accounts default_tasks message_templates institutions plans'}).pipe(
      mergeMap((company) => {
        this.company = company;
        this.accounts = company.accounts;
        this.institutions = company.institutions;
        this.messageTemplates = company.message_templates;
        this.setPlans(company.plans);
        this.setDefaultTasks(company.default_tasks);
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

  public trackByInstitution(_index: number, institution: Institution): string {
    return institution.id;
  }

  public trackByMessageTemplate(_index: number, messageTemplate: string): string {
    return messageTemplate;
  }

  public trackByDefaultTask(_index: number, defaultTask: string): string {
    return defaultTask;
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

  public hasDefaultTasks(): boolean {
    return this.defaultTasks.length + Object.keys(this.defaultTasksByPlan).length > 0;
  }

  public updateCompanyLogo(event: any): void {
    this.saving = true;
    const file = event.target.files[0];
    this.companyService.updateCompanyLogo(file).subscribe((company) => {
      this.company = company;
      this.saving = false;
      this.eventService.publish(EventService.EVENT_COMPANY_CHANGED, company);
      this.alertService.success('Logo atualizado com sucesso!');
    }, (err) => {
      this.saving = false;
      this.alertService.apiError(null, err, 'Não foi possível atualizar o logo, por favor tente novamente mais tarde!');
    });
  }

  public updateCompanyInfo(): void {
    this.saving = true;
    const data = {
      name: this.company.name,
      contact_email: this.company.contact_email,
      contact_phone: this.company.contact_phone,
      website: this.company.website,
    };
    this.companyService.updateCompany(data).subscribe((company) => {
      this.company = company;
      this.saving = false;
      this.eventService.publish(EventService.EVENT_COMPANY_CHANGED, company);
      this.alertService.success('Configurações atualizadas com sucesso!');
    }, (err) => {
      this.saving = false;
      this.alertService.apiError(null, err, 'Não foi possível atualizar as configurações, por favor tente novamente mais tarde!');
    });
  }

  public updateCompanyColors(): void {
    this.saving = true;
    const data = {
      primary_color: this.selectedPaletteVariant.color,
      text_color: this.selectedTextColor,
    };
    this.companyService.updateCompany(data).subscribe((company) => {
      this.company = company;
      this.saving = false;
      this.eventService.publish(EventService.EVENT_COMPANY_CHANGED, company);
      this.alertService.success('Configurações atualizadas com sucesso!');
    }, (err) => {
      this.saving = false;
      this.alertService.apiError(null, err, 'Não foi possível atualizar as configurações, por favor tente novamente mais tarde!');
    });
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

  public openSaveMessageTemplate(messageTemplate?: MessageTemplate): void {
    const modalRef = this.ngbModal.open(SaveMessageTemplateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.messageTemplate = messageTemplate;
    modalRef.result.then((updatedMessageTemplate) => {
      const index = this.messageTemplates.findIndex((currentMessageTemplate) => {
        return currentMessageTemplate.id === updatedMessageTemplate.id;
      });
      if (index < 0) {
        this.messageTemplates.push(updatedMessageTemplate);
      } else {
        this.messageTemplates[index] = updatedMessageTemplate;
      }
    }).catch(() => {
      // Nothing to do...
    });
  }

  public openDeleteMessageTemplate(messageTemplate: MessageTemplate): void {
    const modalRef = this.ngbModal.open(DeleteMessageTemplateComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.messageTemplate = messageTemplate;
    modalRef.result.then(() => {
      const index = this.messageTemplates.findIndex((currentMessageTemplate) => {
        return currentMessageTemplate.id === messageTemplate.id;
      });
      if (index >= 0) {
        this.messageTemplates.splice(index, 1);
      }
    }).catch(() => {
      // Nothing to do...
    });
  }

  public openSaveDefaultTask(defaultTask?: DefaultTask): void {
    const modalRef = this.ngbModal.open(SaveDefaultTaskComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.defaultTask = defaultTask;
    (modalRef.componentInstance.changeEmitter as EventEmitter<DefaultTask>).subscribe((updatedDefaultTask: DefaultTask) => {
      const index = this.defaultTasks.findIndex((currentDefaultTask) => {
        return currentDefaultTask.id === updatedDefaultTask.id;
      });
      if (index < 0) {
        this.defaultTasks.push(updatedDefaultTask);
      } else {
        this.defaultTasks[index] = updatedDefaultTask;
      }
      this.setDefaultTasks(this.defaultTasks);
    });
  }

  public openDeleteDefaultTask(defaultTask: DefaultTask): void {
    const modalRef = this.ngbModal.open(DeleteDefaultTaskComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.defaultTask = defaultTask;
    modalRef.result.then(() => {
      const index = this.defaultTasks.findIndex((currentDefaultTask) => {
        return currentDefaultTask.id === defaultTask.id;
      });
      if (index >= 0) {
        this.defaultTasks.splice(index, 1);
      }
      this.setDefaultTasks(this.defaultTasks);
    }).catch(() => {
      // Nothing to do...
    });
  }

  public openSavePlan(plan?: Plan): void {
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
      this.setPlans(this.plans);
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
        delete this.defaultTasksByPlan[plan.id];
        this.plans.splice(index, 1);
        this.setPlans(this.plans);
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

  private setPlans(plans: Plan[]): void {
    this.plans = plans;
    this.planById = keyBy(plans, (plan) => {
      return plan.id;
    });
  }

  private setDefaultTasks(defaultTasks: DefaultTask[]): void {
    this.defaultTasksByPlan = groupBy(defaultTasks, (defaultTask) => {
      return defaultTask.plan;
    });
    this.defaultTasks = this.defaultTasksByPlan['undefined'] || [];
    delete this.defaultTasksByPlan['undefined'];
  }
}
