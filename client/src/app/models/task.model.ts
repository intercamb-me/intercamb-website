/* tslint:disable:variable-name */

import {TaskAttachment} from 'app/models/task-attachment.model';
import {TaskComment} from 'app/models/task-comment.model';

export class Task {

  public id: string;
  public company: string;
  public client: string;
  public name: string;
  public status: string;
  public schedule_date: Date;
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
      this.schedule_date = data.schedule_date ? new Date(data.schedule_date) : undefined;
      this.registration_date = new Date(data.registration_date);
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
