/* tslint:disable:variable-name */

import {Account} from '@models/account.model';
import {MessageTemplate} from '@models/message-template.model';
import {DefaultTask} from '@models/default-task.model';
import {Institution} from '@models/institution.model';
import {Plan} from '@models/plan.model';

export class Company {

  public id: string;
  public name: string;
  public contact_email: string;
  public contact_phone: string;
  public website: string;
  public logo_url: string;
  public currency: string;
  public primary_color: string;
  public text_color: string;
  public owner: string;
  public message_templates: MessageTemplate[];
  public default_tasks: DefaultTask[];
  public registration_date: Date;

  public accounts: Account[];
  public institutions: Institution[];
  public plans: Plan[];

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.contact_email = data.contact_email;
      this.contact_phone = data.contact_phone;
      this.website = data.website;
      this.logo_url = data.logo_url;
      this.currency = data.currency;
      this.primary_color = data.primary_color;
      this.text_color = data.text_color;
      this.owner = data.owner;
      this.registration_date = new Date(data.registration_date);
      this.accounts = [];
      if (data.accounts) {
        (data.accounts as any[]).forEach((account) => {
          this.accounts.push(new Account(account));
        });
      }
      this.message_templates = [];
      if (data.message_templates) {
        (data.message_templates as any[]).forEach((messageTemplate) => {
          this.message_templates.push(new MessageTemplate(messageTemplate));
        });
      }
      this.default_tasks = [];
      if (data.default_tasks) {
        (data.default_tasks as any[]).forEach((defaultTask) => {
          this.default_tasks.push(new DefaultTask(defaultTask));
        });
      }
      this.institutions = [];
      if (data.institutions) {
        (data.institutions as any[]).forEach((institution) => {
          this.institutions.push(new Institution(institution));
        });
      }
      this.plans = [];
      if (data.plans) {
        (data.plans as any[]).forEach((plan) => {
          this.plans.push(new Plan(plan));
        });
      }
    }
  }
}
