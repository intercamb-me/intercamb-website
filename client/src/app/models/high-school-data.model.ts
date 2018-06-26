/* tslint:disable:variable-name */

export class HighSchoolData {

  public school: string;
  public city: string;
  public state: string;
  public conclusion_year: string;

  constructor(data?: any) {
    if (data) {
      this.school = data.school;
      this.city = data.city;
      this.state = data.state;
      this.conclusion_year = data.conclusion_year;
    }
  }
}
