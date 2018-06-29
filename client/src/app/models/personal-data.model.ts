/* tslint:disable:variable-name */

import {PlaceOfBirth} from 'app/models/place-of-birth.model';
import {IdentityDocument} from 'app/models/identity-document.model';
import {DateUtils} from 'app/utils/date.utils';
import cloneDeep from 'lodash-es/cloneDeep';

export class PersonalData {

  public nationality: string;
  public place_of_birth: PlaceOfBirth;
  public identity_document: IdentityDocument;
  public cpf_number: string;
  public passport_number: string;
  public birthdate: Date;
  public gender: string;
  public marital_status: string;
  public number_of_children: number;

  constructor(data?: any) {
    if (data) {
      this.nationality = data.nationality;
      this.place_of_birth = new PlaceOfBirth(data.place_of_birth || {});
      this.identity_document = new IdentityDocument(data.identity_document || {});
      this.cpf_number = data.cpf_number;
      this.passport_number = data.passport_number;
      this.birthdate = DateUtils.fromDateOnly(data.birthdate);
      this.gender = data.gender;
      this.marital_status = data.marital_status;
      this.number_of_children = data.number_of_children;
    }
  }

  public toJSON(): any {
    const json = cloneDeep(this) as any;
    json.birthdate = DateUtils.toDateOnly(json.birthdate);
    if (!json.birthdate) {
      delete json.birthdate;
    }
    return json;
  }
}
