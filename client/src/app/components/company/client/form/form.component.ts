import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import cloneDeep from 'lodash-es/cloneDeep';

import {SearchAddressComponent} from 'app/components/company/client/search-address/search-address.component';

import {ClientService} from 'app/services/client.service';
import {TokenService} from 'app/services/token.service';
import {AlertService} from 'app/services/alert.service';
import {ErrorUtils} from 'app/utils/error.utils';
import {Helpers} from 'app/utils/helpers';
import {Institution} from 'app/models/institution.model';
import {Client} from 'app/models/client.model';
import {Token} from 'app/models/token.model';
import {Address} from 'app/models/address.model';

@Component({
  selector: 'app-client-form',
  templateUrl: './form.component.html',
})
export class ClientFormComponent implements OnInit {

  public token: Token;
  public formData: any;
  public infoStep = 0;
  public todayDateStruct: NgbDateStruct;
  public onlyDateChars = Helpers.onlyDateChars;
  public loading = true;
  public clientCreated = false;

  constructor(private clientService: ClientService, private tokenService: TokenService, private alertService: AlertService, private activatedRoute: ActivatedRoute, private router: Router, private ngbModal: NgbModal) {

  }

  public ngOnInit(): void {
    const tokenId = this.activatedRoute.snapshot.paramMap.get('token');
    this.tokenService.getToken(tokenId).subscribe((token) => {
      if (token.type !== Token.TYPE_CLIENT_FORM) {
        this.navigateToPageNotFound();
        return;
      }
      this.token = token;
      this.formData = this.getFormData();
      const now = new Date();
      this.todayDateStruct = {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
      };
      this.loading = false;
    }, (err) => {
      if (err.code === ErrorUtils.TOKEN_NOT_FOUND) {
        this.navigateToPageNotFound();
      }
      this.alertService.apiError(null, err);
    });
  }

  public trackByInstitution(_index: number, institution: Institution): string {
    return institution.id;
  }

  public compareInstitutions(institution: Institution, otherInstitution: Institution): boolean {
    return institution && otherInstitution && institution.id === otherInstitution.id;
  }

  public nextInfoStep(): void {
    this.infoStep += 1;
  }

  public previousInfoStep(): void {
    this.infoStep = this.infoStep - 1;
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

  public createClient(): void {
    const data = this.fixFormData();
    this.clientService.createClient(data, this.token).subscribe(() => {
      this.clientCreated = true;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  private navigateToPageNotFound(): void {
    this.router.navigate(['/404'], {
      replaceUrl: false,
      skipLocationChange: true,
    });
  }

  private getFormData(): any {
    const client = new Client({});
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
