/* tslint:disable:variable-name */

import {AcademicData} from 'app/models/academic-data.model';
import {AdditionalInformation} from 'app/models/additional-information.model';
import {Address} from 'app/models/address.model';
import {FamilyData} from 'app/models/family-data.model';
import {InCaseOfEmergency} from 'app/models/in-case-of-emergency.model';
import {IntendedCourse} from 'app/models/intended-course.model';
import {PersonalData} from 'app/models/personal-data.model';

export class Client {

  public id: string;
  public company: string;
  public plan: string;
  public forename: string;
  public surname: string;
  public email: string;
  public phone: string;
  public photo_url: string;
  public registration_date: Date;
  public address: Address;
  public personal_data: PersonalData;
  public family_data: FamilyData;
  public in_case_of_emergency: InCaseOfEmergency;
  public academic_data: AcademicData;
  public intended_course: IntendedCourse;
  public additional_information: AdditionalInformation;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.company = data.company;
      this.plan = data.plan;
      this.forename = data.forename;
      this.surname = data.surname;
      this.email = data.email;
      this.phone = data.phone;
      this.photo_url = data.photo_url;
      this.registration_date = new Date(data.registration_date);
      this.address = new Address(data.address || {});
      this.personal_data = new PersonalData(data.personal_data || {});
      this.family_data = new FamilyData(data.family_data || {});
      this.in_case_of_emergency = new InCaseOfEmergency(data.in_case_of_emergency || {});
      this.academic_data = new AcademicData(data.academic_data || {});
      this.intended_course = new IntendedCourse(data.intended_course || {});
      this.additional_information = new AdditionalInformation(data.additional_information || {});
    }
  }
}
