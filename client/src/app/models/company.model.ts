/* tslint:disable:variable-name */

import {Account} from 'app/models/account.model';
import {DefaultTask} from 'app/models/default-task.model';
import {Institution} from 'app/models/institution.model';
import {Plan} from 'app/models/plan.model';

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
      this.default_tasks = [];
      if (data.default_tasks) {
        (data.default_tasks as any[]).forEach((default_task) => {
          this.default_tasks.push(new DefaultTask(default_task));
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
