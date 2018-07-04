/* tslint:disable:variable-name */

export class TaskAttachment {

  public name: string;
  public type: string;
  public size: number;
  public url: string;

  constructor(data?: any) {
    if (data) {
      this.name = data.name;
      this.type = data.type;
      this.size = data.size;
      this.url = data.url;
    }
  }
}
