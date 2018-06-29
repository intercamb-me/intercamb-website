/* tslint:disable:variable-name */

import {Attachment} from 'app/models/attachment.model';

export class Document {

  public id: string;
  public company: string;
  public client: string;
  public type: string;
  public status: string;
  public attachments: Attachment[];
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.company = data.company;
      this.client = data.client;
      this.type = data.type;
      this.status = data.status;
      this.attachments = [];
      this.registration_date = data.registration_date;
      if (data.attachments) {
        (data.attachments as any[]).forEach((attachment) => {
          this.attachments.push(new Attachment(attachment));
        });
      }
    }
  }
}
