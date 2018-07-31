/* tslint:disable:variable-name */

import {Institution} from 'app/models/institution.model';
import {Plan} from 'app/models/plan.model';

export class Company {

  public id: string;
  public name: string;
  public logo_url: string;
  public currency: string;
  public primary_color: string;
  public text_color: string;
  public owner: string;
  public registration_date: Date;

  public institutions: Institution[];
  public plans: Plan[];

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.logo_url = data.logo_url;
      this.currency = data.currency;
      this.primary_color = data.primary_color;
      this.text_color = data.text_color;
      this.owner = data.owner;
      this.registration_date = new Date(data.registration_date);
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
