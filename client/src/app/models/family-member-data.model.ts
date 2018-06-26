/* tslint:disable:variable-name */

export class FamilyMemberData {

  public name: string;
  public education_level: string;
  public occupation: string;
  public employment_situation: string;

  constructor(data?: any) {
    if (data) {
      this.name = data.name;
      this.education_level = data.education_level;
      this.occupation = data.occupation;
      this.employment_situation = data.employment_situation;
    }
  }
}
