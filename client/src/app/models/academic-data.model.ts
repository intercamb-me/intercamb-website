/* tslint:disable:variable-name */

import {HighSchoolData} from 'app/models/high-school-data.model';
import {HigherEducationData} from 'app/models/higher-education-data.model';

export class AcademicData {

  public high_school: HighSchoolData;
  public higher_education: HigherEducationData;

  constructor(data?: any) {
    if (data) {
      this.high_school = new HighSchoolData(data.high_school || {});
      this.higher_education = new HigherEducationData(data.higher_education || {});
    }
  }
}
