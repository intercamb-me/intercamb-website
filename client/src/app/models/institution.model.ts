/* tslint:disable:variable-name */

export class Institution {

  public name: string;
  public acronym: string;

  constructor(data?: any) {
    if (data) {
      this.name = data.name;
      this.acronym = data.acronym;
    }
  }
}
