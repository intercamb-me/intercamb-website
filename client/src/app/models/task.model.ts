/* tslint:disable:variable-name */

import {Company} from 'app/models/company.model';
import {Client} from 'app/models/client.model';
import {TaskAttachment} from 'app/models/task-attachment.model';
import {TaskComment} from 'app/models/task-comment.model';
import isObject from 'lodash-es/isObject';

export class Task {

  public id: string;
  public company_id: string;
  public company: Company;
  public client_id: string;
  public client: Client;
  public name: string;
  public status: string;
  public schedule_date: Date;
  public attachments: TaskAttachment[];
  public comments: TaskComment[];
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.status = data.status;
      this.schedule_date = data.schedule_date ? new Date(data.schedule_date) : undefined;
      this.registration_date = new Date(data.registration_date);
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
      this.attachments = [];
      if (data.attachments) {
        (data.attachments as any[]).forEach((attachment) => {
          this.attachments.push(new TaskAttachment(attachment));
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
}
