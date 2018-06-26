/* tslint:disable:variable-name */

import {FamilyMemberData} from 'app/models/family-member-data.model';

export class FamilyData {

  public father: FamilyMemberData;
  public mother: FamilyMemberData;

  constructor(data?: any) {
    if (data) {
      this.father = data.father ? new FamilyMemberData(data.father) : null;
      this.mother = data.mother ? new FamilyMemberData(data.mother) : null;
    }
  }
}
