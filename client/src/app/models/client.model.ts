/* tslint:disable:variable-name */

import {AcademicData} from '@models/academic-data.model';
import {AdditionalInformation} from '@models/additional-information.model';
import {Address} from '@models/address.model';
import {Company} from '@models/company.model';
import {FamilyData} from '@models/family-data.model';
import {InCaseOfEmergency} from '@models/in-case-of-emergency.model';
import {IntendedCourse} from '@models/intended-course.model';
import {Metadata} from '@models/metadata.model';
import {PaymentOrder} from '@models/payment-order.model';
import {PersonalData} from '@models/personal-data.model';
import {Plan} from '@models/plan.model';
import {Task} from '@models/task.model';
import isObject from 'lodash-es/isObject';
import cloneDeep from 'lodash-es/cloneDeep';

export class Client {

  public id: string;
  public company_id: string;
  public company: Company;
  public plan_id: string;
  public plan: Plan;
  public forename: string;
  public surname: string;
  public email: string;
  public phone: string;
  public photo_url: string;
  public needs_revision: boolean;
  public registration_date: Date;
  public address: Address;
  public personal_data: PersonalData;
  public family_data: FamilyData;
  public in_case_of_emergency: InCaseOfEmergency;
  public academic_data: AcademicData;
  public intended_course: IntendedCourse;
  public additional_information: AdditionalInformation;
  public payment_orders: PaymentOrder[];
  public tasks: Task[];
  public metadata: Metadata;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.forename = data.forename;
      this.surname = data.surname;
      this.email = data.email;
      this.phone = data.phone;
      this.photo_url = data.photo_url;
      this.needs_revision = data.needs_revision;
      this.registration_date = new Date(data.registration_date);
      this.address = new Address(data.address || {});
      this.personal_data = new PersonalData(data.personal_data || {});
      this.family_data = new FamilyData(data.family_data || {});
      this.in_case_of_emergency = new InCaseOfEmergency(data.in_case_of_emergency || {});
      this.academic_data = new AcademicData(data.academic_data || {});
      this.intended_course = new IntendedCourse(data.intended_course || {});
      this.additional_information = new AdditionalInformation(data.additional_information || {});
      this.metadata = new Metadata(data.metadata);
      if (isObject(data.company)) {
        this.company = new Company(data.company);
        this.company_id = this.company.id;
      } else {
        this.company_id = data.company;
      }
      if (isObject(data.plan)) {
        this.plan = new Plan(data.plan);
        this.plan_id = this.plan.id;
      } else {
        this.plan_id = data.plan;
      }
      this.payment_orders = [];
      if (data.payment_orders) {
        (data.payment_orders as any[]).forEach((payment_order) => {
          this.payment_orders.push(new PaymentOrder(payment_order));
        });
      }
      this.tasks = [];
      if (data.tasks) {
        (data.tasks as any[]).forEach((task) => {
          this.tasks.push(new Task(task));
        });
      }
    }
  }

  public getFullName(): string {
    return `${this.forename} ${this.surname}`;
  }

  public toJSON(): any {
    const json = cloneDeep(this) as any;
    json.company = json.company_id;
    delete json.company_id;
    json.plan = json.plan_id;
    delete json.plan_id;
    return json;
  }
}
