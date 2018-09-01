/* tslint:disable:variable-name */

import {Client} from '@models/client.model';
import {Company} from '@models/company.model';
import {Plan} from '@models/plan.model';
import {TaskAttachment} from '@models/task-attachment.model';
import {TaskChecklist} from '@models/task-checklist.model';
import {TaskComment} from '@models/task-comment.model';
import {TaskCounters} from '@models/task-counters.model';
import {TaskPlace} from '@models/task-place.model';
import isObject from 'lodash-es/isObject';
import cloneDeep from 'lodash-es/cloneDeep';

export class Task {

  public id: string;
  public company_id: string;
  public company: Company;
  public client_id: string;
  public client: Client;
  public plan_id: string;
  public plan: Plan;
  public name: string;
  public status: string;
  public schedule_date: Date;
  public attachments: TaskAttachment[];
  public comments: TaskComment[];
  public checklists: TaskChecklist[];
  public counters: TaskCounters;
  public place: TaskPlace;
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.status = data.status;
      this.schedule_date = data.schedule_date ? new Date(data.schedule_date) : undefined;
      this.registration_date = new Date(data.registration_date);
      this.counters = new TaskCounters(data.counters);
      this.place = data.place ? new TaskPlace(data.place) : undefined;
      if (isObject(data.company)) {
        this.company = new Company(data.company);
        this.company_id = this.company.id;
      } else {
        this.company_id = data.company;
      }
      if (isObject(data.client)) {
        this.client = new Client(data.client);
        this.client_id = this.client.id;
      } else {
        this.client_id = data.client;
      }
      if (isObject(data.plan)) {
        this.plan = new Plan(data.plan);
        this.plan_id = this.plan.id;
      } else {
        this.plan_id = data.plan;
      }
      this.attachments = [];
      if (data.attachments) {
        (data.attachments as any[]).forEach((attachment) => {
          this.attachments.push(new TaskAttachment(attachment));
        });
      }
      this.checklists = [];
      if (data.checklists) {
        (data.checklists as any[]).forEach((checklist) => {
          this.checklists.push(new TaskChecklist(checklist));
        });
      }
      this.comments = [];
      if (data.comments) {
        (data.comments as any[]).forEach((comment) => {
          this.comments.push(new TaskComment(comment));
        });
      }
    }
  }

  public toJSON(): any {
    const json = cloneDeep(this) as any;
    json.company = json.company_id;
    delete json.company_id;
    json.client = json.client_id;
    delete json.client_id;
    json.plan = json.plan_id;
    delete json.plan_id;
    return json;
  }
}
