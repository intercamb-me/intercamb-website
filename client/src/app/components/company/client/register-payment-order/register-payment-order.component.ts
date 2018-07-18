import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import fill from 'lodash-es/fill';

import {CompanyService} from 'app/services/company.service';
import {ClientService} from 'app/services/client.service';
import {AlertService} from 'app/services/alert.service';
import {Constants} from 'app/utils/constants';
import {Company} from 'app/models/company.model';
import {Client} from 'app/models/client.model';
import {PaymentOrder} from 'app/models/payment-order.model';

@Component({
  selector: 'app-register-payment-order',
  templateUrl: './register-payment-order.component.html',
})
export class RegisterPaymentOrderComponent implements OnInit {

  @Input()
  public client: Client;

  public company: Company;
  public selectedMethod: string;
  public amount: number;
  public split = 1;
  public splitAmounts: number[] = [];
  public loading = true;
  public methods = Constants.PAYMENT_METHODS;

  constructor(private companyService: CompanyService, private clientService: ClientService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

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

  public selectMethod(method: string): void {
    this.selectedMethod = method;
  }

  public registerPaymentOrder(): void {
    const data: PaymentOrder[] = [];
    this.splitAmounts.forEach((amount) => {
      data.push(new PaymentOrder({amount, method: this.selectedMethod}));
    });
    this.clientService.registerPaymentOrders(this.client, data).subscribe((paymentOrders) => {
      this.ngbActiveModal.close(paymentOrders);
      this.alertService.success('Ordens de pagamento adicionadas com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível adicionar as ordens de pagament, por favor tente novamente mais tarde!');
    });
  }
}
