import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
import {TokenService} from 'app/services/token.service';
import {AlertService} from 'app/services/alert.service';
import {ErrorUtils} from 'app/utils/error.utils';
import {onlyDateChars} from 'app/utils/helpers';
import {Client} from 'app/models/client.model';
import {Token} from 'app/models/token.model';
import {Address} from 'app/models/address.model';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
})
export class ClientFormComponent implements OnInit {

  public token: Token;
  public client = new Client({});
  public loading = true;
  public clientCreated = false;
  public infoStep = 0;
  public birthdateStruct: NgbDateStruct;
  public arrivalDateStruct: NgbDateStruct;
  public pastDateStruct: NgbDateStruct;
  public todayDateStruct: NgbDateStruct;
  public onlyDateChars = onlyDateChars;

  constructor(private clientService: ClientService, private tokenService: TokenService, private alertService: AlertService, private activatedRoute: ActivatedRoute, private router: Router, private ngbModal: NgbModal) {

  }

  public ngOnInit(): void {
    const now = new Date();
    this.pastDateStruct = {year: 1950, month: 1, day: 1};
    this.todayDateStruct = {
      year: getYear(now),
      month: getMonth(now) + 1,
      day: getDate(now),
    };

    const tokenId = this.activatedRoute.snapshot.paramMap.get('token');
    this.tokenService.getToken(tokenId).subscribe((token) => {
      if (token.type !== Token.TYPE_CLIENT_FORM) {
        this.navigateToPageNotFound();
        return;
      }
      this.token = token;
      this.loading = false;
    }, (err) => {
      if (err.code === ErrorUtils.TOKEN_NOT_FOUND) {
        this.navigateToPageNotFound();
      }
      this.alertService.apiError(null, err);
    });
  }

  public nextInfoStep(): void {
    this.infoStep = this.infoStep + 1;
  }

  public previousInfoStep(): void {
    this.infoStep = this.infoStep - 1;
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
    this.clientService.createClient(this.client, this.token).subscribe((client) => {
      this.client = client;
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
