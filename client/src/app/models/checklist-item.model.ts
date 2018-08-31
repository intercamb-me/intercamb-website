/* tslint:disable:variable-name */

export class ChecklistItem {

  public name: string;
  public done: boolean;

  constructor(data?: any) {
    if (data) {
      this.name = data.name;
      this.done = data.done;
    }
  }
}
