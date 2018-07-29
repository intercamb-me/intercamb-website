import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import cloneDeep from 'lodash-es/cloneDeep';

import {SearchAddressComponent} from 'app/components/company/client/search-address/search-address.component';

import {CompanyService} from 'app/services/company.service';
import {ClientService} from 'app/services/client.service';
import {AlertService} from 'app/services/alert.service';
import {Helpers} from 'app/utils/helpers';
import {Company} from 'app/models/company.model';
import {Institution} from 'app/models/institution.model';
import {Client} from 'app/models/client.model';
import {Address} from 'app/models/address.model';

@Component({
  selector: 'app-save-client',
  templateUrl: './save-client.component.html',
})
export class SaveClientComponent implements OnInit {

  @Input()
  public client: Client;
  @Output()
  public saved = new EventEmitter<Client>();

  public company: Company;
  public formData: any;
  public todayDateStruct: NgbDateStruct;
  public onlyDateChars = Helpers.onlyDateChars;
  public loading = true;

  constructor(private companyService: CompanyService, private clientService: ClientService, private alertService: AlertService, private ngbModal: NgbModal) {

  }

  public ngOnInit(): void {
    this.companyService.getCompany({select: 'institutions', populate: 'institutions'}).subscribe((company) => {
      this.company = company;
      this.formData = this.getFormData();
      const now = new Date();
      this.todayDateStruct = {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
      };
      this.loading = false;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public trackByInstitution(_index: number, institution: Institution): string {
    return institution.id;
  }

  public compareInstitutions(institution: Institution, otherInstitution: Institution): boolean {
    return institution && otherInstitution && institution.id === otherInstitution.id;
  }

  public searchAddress(): void {
    const modalRef = this.ngbModal.open(SearchAddressComponent);
    modalRef.result.then((address: Address) => {
      this.formData.address.zip_code = address.zip_code;
      this.formData.address.state = address.state;
      this.formData.address.city = address.city;
      this.formData.address.neighborhood = address.neighborhood;
      this.formData.address.public_place = address.public_place;
    }).catch(() => {
      // Nothing to do...
    });
  }

  public saveClient(): void {
    const data = this.fixFormData();
    const observable = !this.client.id ? this.clientService.createClient(data) : this.clientService.updateClient(this.client, data);
    observable.subscribe((client) => {
      if (!this.client.id) {
        this.alertService.success('Cliente cadastrado com sucesso!');
      } else {
        this.alertService.success('Cliente atualizado com sucesso!');
      }
      this.client = client;
      this.saved.emit(client);
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  private getFormData(): any {
    const client = cloneDeep(this.client);
    const data: any = {
      forename: client.forename,
      surname: client.surname,
      email: client.email,
      phone: client.phone,
      address: client.address,
      personal_data: client.personal_data,
      family_data: client.family_data,
      in_case_of_emergency: client.in_case_of_emergency,
      academic_data: client.academic_data,
      intended_course: client.intended_course,
      additional_information: client.additional_information,
    };
    if (data.address.number) {
      data.address.number = String(data.address.number);
    }
    if (data.academic_data.high_school.conclusion_year) {
      data.academic_data.high_school.conclusion_year = String(data.academic_data.high_school.conclusion_year);
    }
    if (data.academic_data.higher_education.conclusion_year) {
      data.academic_data.higher_education.conclusion_year = String(data.academic_data.higher_education.conclusion_year);
    }
    if (data.personal_data.birthdate) {
      const birthdate = data.personal_data.birthdate;
      data.personal_data.birthdate = {
        year: birthdate.getFullYear(),
        month: birthdate.getMonth() + 1,
        day: birthdate.getDate(),
      };
    }
    if (data.additional_information.arrival_date) {
      const arrivalDate = data.additional_information.arrival_date;
      data.additional_information.arrival_date = {
        year: arrivalDate.getFullYear(),
        month: arrivalDate.getMonth() + 1,
        day: arrivalDate.getDate(),
      };
    }
    return data;
  }

  private fixFormData(): any {
    const data = cloneDeep(this.formData);
    if (data.address.number) {
      data.address.number = Number(data.address.number);
    }
    if (data.academic_data.high_school.conclusion_year) {
      data.academic_data.high_school.conclusion_year = Number(data.academic_data.high_school.conclusion_year);
    }
    if (data.academic_data.higher_education.conclusion_year) {
      data.academic_data.higher_education.conclusion_year = Number(data.academic_data.higher_education.conclusion_year);
    }
    if (data.personal_data.birthdate) {
      const birthdate = new Date(data.personal_data.birthdate.year, data.personal_data.birthdate.month - 1, data.personal_data.birthdate.day);
      data.personal_data.birthdate = birthdate;
    }
    if (data.additional_information.arrival_date) {
      const arrivalDate = new Date(data.additional_information.arrival_date.year, data.additional_information.arrival_date.month - 1, data.additional_information.arrival_date.day);
      data.additional_information.arrival_date = arrivalDate;
    }
    return data;
  }
}
