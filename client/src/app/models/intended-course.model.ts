/* tslint:disable:variable-name */

import {Institution} from 'app/models/institution.model';
import isObject from 'lodash-es/isObject';

export class IntendedCourse {

  public name: string;
  public institution_id: string;
  public institution: Institution;
  public preferred_shift: string;
  public alternative_shift: string;

  constructor(data?: any) {
    if (data) {
      this.name = data.name;
      this.preferred_shift = data.preferred_shift;
      this.alternative_shift = data.alternative_shift;
      if (isObject(data.institution)) {
        this.institution = new Institution(data.institution);
        this.institution_id = this.institution.id;
      } else {
        this.institution_id = data.institution;
      }
    }
  }
}
