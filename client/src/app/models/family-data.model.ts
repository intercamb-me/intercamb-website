/* tslint:disable:variable-name */

import {FamilyMemberData} from '@models/family-member-data.model';

export class FamilyData {

  public father: FamilyMemberData;
  public mother: FamilyMemberData;

  constructor(data?: any) {
    if (data) {
      this.father = new FamilyMemberData(data.father || {});
      this.mother = new FamilyMemberData(data.mother || {});
    }
  }
}
