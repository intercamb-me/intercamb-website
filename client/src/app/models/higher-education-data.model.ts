/* tslint:disable:variable-name */

export class HigherEducationData {

  public institution: string;
  public course: string;
  public city: string;
  public state: string;
  public conclusion_year: string;

  constructor(data?: any) {
    if (data) {
      this.institution = data.institution;
      this.course = data.course;
      this.city = data.city;
      this.state = data.state;
      this.conclusion_year = data.conclusion_year;
    }
  }
}
