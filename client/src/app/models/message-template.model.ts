/* tslint:disable:variable-name */

export class MessageTemplate {

  public id: string;
  public identifier: string;
  public title: string;
  public body: string;
  public company: string;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.identifier = data.identifier;
      this.title = data.title;
      this.body = data.body;
      this.company = data.company;
    }
  }
}
