/* tslint:disable:variable-name */

import {TaskProperties} from 'app/models/task-properties.model';
import {TaskAttachment} from 'app/models/task-attachment.model';
import {TaskComment} from 'app/models/task-comment.model';

export class Task {

  public id: string;
  public company: string;
  public client: string;
  public name: string;
  public status: string;
  public schedulable: boolean;
  public properties: TaskProperties;
  public attachments: TaskAttachment[];
  public comments: TaskComment[];
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.company = data.company;
      this.client = data.client;
      this.name = data.name;
      this.status = data.status;
      this.schedulable = data.schedulable;
      this.properties = new TaskProperties(data.properties || {});
      this.attachments = [];
      this.comments = [];
      this.registration_date = data.registration_date;
      if (data.attachments) {
        (data.attachments as any[]).forEach((attachment) => {
          this.attachments.push(new TaskAttachment(attachment));
        });
      }
      if (data.comments) {
        (data.comments as any[]).forEach((comment) => {
          this.comments.push(new TaskComment(comment));
        });
      }
    }
  }
}
