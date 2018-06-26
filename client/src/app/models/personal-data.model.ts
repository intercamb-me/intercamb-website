/* tslint:disable:variable-name */

import {PlaceOfBirth} from 'app/models/place-of-birth.model';
import {IdentityCard} from 'app/models/identity-card.model';

export class PersonalData {

  public nationality: string;
  public place_of_birth: PlaceOfBirth;
  public identity_card: IdentityCard;
  public cpf_number: string;
  public passport_number: string;
  public birthdate: Date;
  public gender: string;
  public civil_state: string;
  public number_of_children: number;

  constructor(data?: any) {
    if (data) {
      this.nationality = data.nationality;
      this.place_of_birth = data.place_of_birth ? new PlaceOfBirth(data.place_of_birth) : null;
      this.identity_card = data.identity_card ? new IdentityCard(data.identity_card) : null;
      this.cpf_number = data.cpf_number;
      this.passport_number = data.passport_number;
      this.birthdate = data.birthdate;
      this.gender = data.gender;
      this.civil_state = data.civil_state;
      this.number_of_children = data.number_of_children;
    }
  }
}
