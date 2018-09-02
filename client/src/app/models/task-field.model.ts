/* tslint:disable:variable-name */

export class TaskField {

  public name: string;
  public type: string;
  public value: any;

  constructor(data?: any) {
    if (data) {
      this.name = data.name;
      this.type = data.type;
      this.value = data.value;
    }
  }
}
