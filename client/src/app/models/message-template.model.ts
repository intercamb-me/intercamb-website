/* tslint:disable:variable-name */

export class MessageTemplate {

  public id: string;
  public identifier: string;
  public title: string;
  public template: string;
  public company: string;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.identifier = data.identifier;
      this.title = data.title;
      this.template = data.template;
      this.company = data.company;
    }
  }
}
