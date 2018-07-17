import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {faCreditCard} from '@fortawesome/free-solid-svg-icons/faCreditCard';
import {faBarcode} from '@fortawesome/free-solid-svg-icons/faBarcode';
import {faMoneyBill} from '@fortawesome/free-solid-svg-icons/faMoneyBill';

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
  public selectedMethod: Method;
  public methods = [
    {name: 'Cartão de crédito', icon: faCreditCard},
    {name: 'Boleto', icon: faBarcode},
    {name: 'Dinheiro', icon: faMoneyBill},
  ];

  constructor(private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {

  }

  public trackByIndex(index: number): number {
    return index;
  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public selectMethod(method: Method): void {
    this.selectedMethod = method;
  }
}
