/* tslint:disable:variable-name */

export class Institution {

  public id: string;
  public country: string;
  public name: string;
  public acronym: string;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.country = data.country;
      this.name = data.name;
      this.acronym = data.acronym;
    }
  }
}
