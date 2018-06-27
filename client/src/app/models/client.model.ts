/* tslint:disable:variable-name */

import {Address} from 'app/models/address.model';
import {PersonalData} from 'app/models/personal-data.model';
import {FamilyData} from 'app/models/family-data.model';
import {AcademicData} from 'app/models/academic-data.model';
import {IntendedCourse} from 'app/models/intended-course.model';
import {AdditionalInformation} from 'app/models/additional-information.model';

export class Client {

  public id: string;
  public company: string;
  public forename: string;
  public surname: string;
  public email: string;
  public phone: string;
  public photo_url: string;
  public registration_date: Date;
  public address: Address;
  public personal_data: PersonalData;
  public family_data: FamilyData;
  public academic_data: AcademicData;
  public intended_course: IntendedCourse;
  public additional_information: AdditionalInformation;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.company = data.company;
      this.forename = data.forename;
      this.surname = data.surname;
      this.email = data.email;
      this.phone = data.phone;
      this.photo_url = data.photo_url;
      this.registration_date = data.registration_date;
      this.address = data.address ? new Address(data.address) : null;
      this.personal_data = data.personal_data ? new PersonalData(data.personal_data) : null;
      this.family_data = data.family_data ? new FamilyData(data.family_data) : null;
      this.academic_data = data.academic_data ? new AcademicData(data.academic_data) : null;
      this.intended_course = data.intended_course ? new IntendedCourse(data.intended_course) : null;
      this.additional_information = data.additional_information ? new AdditionalInformation(data.additional_information) : null;
    }
  }
}
