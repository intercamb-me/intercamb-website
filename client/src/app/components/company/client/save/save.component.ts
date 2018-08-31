import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NgbModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import cloneDeep from 'lodash-es/cloneDeep';

import {SearchAddressComponent} from 'app/components/company/client/search-address/search-address.component';

import {CompanyService} from 'app/services/company.service';
import {ClientService} from 'app/services/client.service';
import {AlertService} from 'app/services/alert.service';
import {Constants} from 'app/utils/constants';
import {Helpers} from 'app/utils/helpers';
import {Address} from 'app/models/address.model';
import {Client} from 'app/models/client.model';
import {Company} from 'app/models/company.model';
import {Institution} from 'app/models/institution.model';

@Component({
  selector: 'app-save-client',
  templateUrl: './save.component.html',
})
export class SaveClientComponent implements OnInit {

  @Input()
  public client: Client;
  @Output()
  public saved = new EventEmitter<Client>();

  public company: Company;
  public photo: File;
  public formData: any;
  public todayDateStruct: NgbDateStruct;
  public phonePattern = Constants.PHONE_PATTERN;
  public phoneMask = Constants.PHONE_MASK;
  public cpfMask = Constants.CPF_MASK;
  public zipCodeMask = Constants.ZIP_CODE_MASK;
  public onlyDateChars = Helpers.onlyDateChars;
  public loading = true;
  public saving = false;

  constructor(private companyService: CompanyService, private clientService: ClientService, private alertService: AlertService, private ngbModal: NgbModal) {

  }

  public ngOnInit(): void {
    this.companyService.getCompany({select: 'institutions', populate: 'institutions'}).pipe(
      mergeMap((company) => {
        this.company = company;
        return this.client.id ? this.clientService.getClient(this.client.id) : of(new Client({}));
      })
    ).subscribe((client) => {
      this.client = client;
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

  public getDefaultPhotoUrl(): string {
    return 'https://cdn.intercamb.me/images/client_default_photo.png';
  }

  public searchAddress(): void {
    const modalRef = this.ngbModal.open(SearchAddressComponent, {
      backdrop: 'static',
      keyboard: false,
    });
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
    this.saving = true;
    const data = this.fixFormData();
    const saveClient = !this.client.id ? this.clientService.createClient(data) : this.clientService.updateClient(this.client, data);
    saveClient.pipe(
      mergeMap((client) => {
        return this.photo ? this.clientService.updateClientPhoto(client, this.photo) : of(client);
      })
    ).subscribe((client) => {
      if (!this.client.id) {
        this.alertService.success('Cliente cadastrado com sucesso!');
      } else {
        this.alertService.success('Cliente atualizado com sucesso!');
      }
      this.client = client;
      this.saving = false;
      this.saved.emit(client);
    }, (err) => {
      this.saving = false;
      if (!this.client.id) {
        this.alertService.apiError(null, err, 'Não foi possível cadastrar o cliente, por favor tente novamente em alguns instantes!');
      } else {
        this.alertService.apiError(null, err, 'Não foi possível atualizar o cliente, por favor tente novamente em alguns instantes!');
      }
    });
  }

  public updateClientPhoto(event: any): void {
    this.saving = true;
    this.photo = event.target.files[0];
    if (this.client.id) {
      this.clientService.updateClientPhoto(this.client, this.photo).subscribe((client) => {
        this.client.photo_url = client.photo_url;
        this.saving = false;
        this.alertService.success('Imagem atualizada com sucesso!');
      }, (err) => {
        this.saving = false;
        this.alertService.apiError(null, err, 'Não foi possível atualizar a imagem, por favor tente novamente mais tarde!');
      });
    }
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
