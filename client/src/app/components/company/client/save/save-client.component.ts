import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import * as getYear from 'date-fns/get_year';
import * as setYear from 'date-fns/set_year';
import * as getMonth from 'date-fns/get_month';
import * as setMonth from 'date-fns/set_month';
import * as getDate from 'date-fns/get_date';
import * as setDate from 'date-fns/set_date';

import {ClientService} from 'app/services/client.service';
import {AlertService} from 'app/services/alert.service';
import {onlyDateChars} from 'app/utils/angular.utils';
import {Client} from 'app/models/client.model';

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

  constructor(private clientService: ClientService, private alertService: AlertService) {

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

  public create(): void {
    this.fixDates();
    this.clientService.createClient(this.client).subscribe((client) => {
      this.client = client;
      this.saved.emit(client);
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public update(): void {
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
