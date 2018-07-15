import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import * as getYear from 'date-fns/get_year';
import * as setYear from 'date-fns/set_year';
import * as getMonth from 'date-fns/get_month';
import * as setMonth from 'date-fns/set_month';
import * as getDate from 'date-fns/get_date';
import * as setDate from 'date-fns/set_date';

import {SearchAddressComponent} from 'app/components/company/client/search-address/search-address.component';

import {ClientService} from 'app/services/client.service';
import {AlertService} from 'app/services/alert.service';
import {onlyDateChars} from 'app/utils/angular.utils';
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

  public birthdateStruct: NgbDateStruct;
  public arrivalDateStruct: NgbDateStruct;
  public pastDateStruct: NgbDateStruct;
  public todayDateStruct: NgbDateStruct;
  public onlyDateChars = onlyDateChars;

  constructor(private clientService: ClientService, private alertService: AlertService, private ngbModal: NgbModal) {

  }

  public ngOnInit(): void {
    if (this.client.personal_data.birthdate) {
      const birthdate = this.client.personal_data.birthdate;
      this.birthdateStruct = {
        year: getYear(birthdate),
        month: getMonth(birthdate) + 1,
        day: getDate(birthdate),
      };
    }
    if (this.client.additional_information.arrival_date) {
      const arrivalDate = this.client.additional_information.arrival_date;
      this.arrivalDateStruct = {
        year: getYear(arrivalDate),
        month: getMonth(arrivalDate) + 1,
        day: getDate(arrivalDate),
      };
    }
    const now = new Date();
    this.pastDateStruct = {year: 1950, month: 1, day: 1};
    this.todayDateStruct = {
      year: getYear(now),
      month: getMonth(now) + 1,
      day: getDate(now),
    };
  }

  public searchAddress(): void {
    const modalRef = this.ngbModal.open(SearchAddressComponent);
    modalRef.result.then((address: Address) => {
      this.client.address.zip_code = address.zip_code;
      this.client.address.state = address.state;
      this.client.address.city = address.city;
      this.client.address.neighborhood = address.neighborhood;
      this.client.address.public_place = address.public_place;
    }).catch(() => {
      // Nothing to do...
    });
  }

  public createClient(): void {
    this.fixDates();
    this.clientService.createClient(this.client).subscribe((client) => {
      this.client = client;
      this.saved.emit(client);
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public updateClient(): void {
    this.fixDates();
    this.clientService.updateClient(this.client).subscribe((client) => {
      this.client = client;
      this.saved.emit(client);
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  private fixDates(): void {
    if (this.birthdateStruct) {
      let birthdate = new Date();
      birthdate = setYear(birthdate, this.birthdateStruct.year);
      birthdate = setMonth(birthdate, this.birthdateStruct.month - 1);
      birthdate = setDate(birthdate, this.birthdateStruct.day);
      this.client.personal_data.birthdate = birthdate;
    }
    if (this.arrivalDateStruct) {
      let arrivalDate = new Date();
      arrivalDate = setYear(arrivalDate, this.arrivalDateStruct.year);
      arrivalDate = setMonth(arrivalDate, this.arrivalDateStruct.month - 1);
      arrivalDate = setDate(arrivalDate, this.arrivalDateStruct.day);
      this.client.additional_information.arrival_date = arrivalDate;
    }
  }
}
