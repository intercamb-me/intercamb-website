import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import * as getYear from 'date-fns/getYear';
import * as setYear from 'date-fns/setYear';
import * as getMonth from 'date-fns/getMonth';
import * as setMonth from 'date-fns/setMonth';
import * as getDate from 'date-fns/getDate';
import * as setDate from 'date-fns/setDate';

import {ClientService} from 'app/services/client.service';
import {AlertService} from 'app/services/alert.service';
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

  public birthdate: NgbDateStruct;
  public arrivalDate: NgbDateStruct;
  public minDateStruct: NgbDateStruct;
  public currentDateStruct: NgbDateStruct;

  constructor(private clientService: ClientService, private alertService: AlertService) {

  }

  public ngOnInit(): void {
    if (this.client.personal_data.birthdate) {
      const birthdate = this.client.personal_data.birthdate;
      this.birthdate = {
        year: getYear(birthdate),
        month: getYear(birthdate),
        day: getYear(birthdate),
      };
    }
    if (this.client.additional_information.arrival_date) {
      const arrivalDate = this.client.additional_information.arrival_date;
      this.arrivalDate = {
        year: getYear(arrivalDate),
        month: getYear(arrivalDate),
        day: getYear(arrivalDate),
      };
    }
    const now = new Date();
    this.minDateStruct = {year: 1950, month: 1, day: 1};
    this.currentDateStruct = {
      year: getYear(now),
      month: getMonth(now) + 1,
      day: getDate(now),
    };
  }

  public onlyDateChars(event: KeyboardEvent): boolean {
    const charCode = event.which || event.keyCode;
    // Accepts character '/' or numbers 0-9.
    if (charCode >= 47 && charCode <= 57) {
      return true;
    }
    return false;
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
    if (this.birthdate) {
      let birthdate = new Date();
      birthdate = setYear(birthdate, this.birthdate.year);
      birthdate = setMonth(birthdate, this.birthdate.month - 1);
      birthdate = setDate(birthdate, this.birthdate.day);
      this.client.personal_data.birthdate = birthdate;
    }
    if (this.arrivalDate) {
      let arrivalDate = new Date();
      arrivalDate = setYear(arrivalDate, this.arrivalDate.year);
      arrivalDate = setMonth(arrivalDate, this.arrivalDate.month - 1);
      arrivalDate = setDate(arrivalDate, this.arrivalDate.day);
      this.client.additional_information.arrival_date = arrivalDate;
    }
  }
}
