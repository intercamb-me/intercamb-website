import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {faCreditCard} from '@fortawesome/free-solid-svg-icons/faCreditCard';
import {faBarcode} from '@fortawesome/free-solid-svg-icons/faBarcode';
import {faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons/faEnvelopeOpen';
import {faDollarSign} from '@fortawesome/free-solid-svg-icons/faDollarSign';
import fill from 'lodash-es/fill';

import {CompanyService} from 'app/services/company.service';
import {AlertService} from 'app/services/alert.service';
import {Company} from 'app/models/company.model';
import {Client} from 'app/models/client.model';

interface Method {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-register-payment-order',
  templateUrl: './register-payment-order.component.html',
})
export class RegisterPaymentOrderComponent implements OnInit {

  @Input()
  public client: Client;

  public company: Company;
  public selectedMethod: Method;
  public amount: number;
  public split = 1;
  public splitAmounts: number[] = [];
  public loading = true;
  public methods = [
    {name: 'Cartão de crédito', icon: faCreditCard},
    {name: 'Boleto', icon: faBarcode},
    {name: 'Deposito bancário', icon: faEnvelopeOpen},
    {name: 'Outros', icon: faDollarSign},
  ];

  constructor(private companyService: CompanyService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    this.companyService.getCompany().subscribe((company) => {
      this.company = company;
      this.loading = false;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public trackByIndex(index: number): number {
    return index;
  }

  public onSplitChange(): void {
    if (this.amount) {
      const splitAmount = Math.round((Number(this.amount) / this.split) * 100) / 100;
      // tslint:disable-next-line: prefer-array-literal
      this.splitAmounts = fill(new Array(this.split), splitAmount);
    }
  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public selectMethod(method: Method): void {
    this.selectedMethod = method;
  }
}
