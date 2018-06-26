/* tslint:disable:variable-name */

export class IntendedCourse {

  public name: string;
  public institution: string;
  public preferred_shift: string;
  public alternative_shift: string;

  constructor(data?: any) {
    if (data) {
      this.name = data.name;
      this.institution = data.institution;
      this.preferred_shift = data.preferred_shift;
      this.alternative_shift = data.alternative_shift;
    }
  }
}
