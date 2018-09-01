/* tslint:disable:variable-name */

import {Institution} from '@models/institution.model';
import isObject from 'lodash-es/isObject';
import cloneDeep from 'lodash-es/cloneDeep';

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

  public toJSON(): any {
    const json = cloneDeep(this) as any;
    json.institution = json.institution_id;
    delete json.institution_id;
    return json;
  }
}
