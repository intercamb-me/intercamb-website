/* tslint:disable:variable-name */

export class TaskCounters {

  public attachments: string;
  public comments: string;

  constructor(data?: any) {
    if (data) {
      this.attachments = data.attachments;
      this.comments = data.comments;
    }
  }
}
