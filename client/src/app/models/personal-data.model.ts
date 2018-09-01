/* tslint:disable:variable-name */

import {CalendarUtils} from '@utils/calendar.utils';
import {IdentityDocument} from '@models/identity-document.model';
import {PlaceOfBirth} from '@models/place-of-birth.model';
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

  constructor(data?: any) {
    if (data) {
      this.nationality = data.nationality;
      this.place_of_birth = new PlaceOfBirth(data.place_of_birth || {});
      this.identity_document = new IdentityDocument(data.identity_document || {});
      this.cpf_number = data.cpf_number;
      this.passport_number = data.passport_number;
      this.birthdate = CalendarUtils.fromDateOnly(data.birthdate);
      this.gender = data.gender;
      this.marital_status = data.marital_status;
    }
  }

  public toJSON(): any {
    const json = cloneDeep(this) as any;
    if (json.birthdate) {
      json.birthdate = CalendarUtils.toDateOnly(json.birthdate);
    }
    return json;
  }
}
