import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

import {PaymentService} from 'app/services/payment.service';
import {AlertService} from 'app/services/alert.service';
import {DateUtils} from 'app/utils/date.utils';
import {onlyDateChars} from 'app/utils/helpers';
import {PaymentOrder} from 'app/models/payment-order.model';

@Component({
  selector: 'app-change-payment-order-status',
  templateUrl: './change-status.component.html',
})
export class ChangePaymentOrderStatusComponent implements OnInit {

  @Input()
  public paymentOrder: PaymentOrder;

  public paid: boolean;
  public paymentDateStruct: NgbDateStruct;
  public onlyDateChars = onlyDateChars;
  public selectingPaymentDate = false;
  public loading = true;

  constructor(private paymentService: PaymentService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    this.paid = this.paymentOrder.paid;
    this.paymentDateStruct = DateUtils.toDateStruct(this.paymentOrder.payment_date);
  }

  public trackByIndex(index: number): number {
    return index;
  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public changeStatus(paid: boolean): void {
    this.paid = paid;
    this.paymentDateStruct = null;
    if (paid) {
      this.selectingPaymentDate = true;
    } else {
      this.updatePaymentOrder();
    }
  }

  public backToStatusOptions(): void {
    this.selectingPaymentDate = false;
  }

  public updatePaymentOrder(): void {
    const data = {
      paid: this.paid,
      payment_date: this.paid ? DateUtils.fromDateStruct(this.paymentDateStruct) : null,
    };
    this.paymentService.updatePaymentOrder(this.paymentOrder, data).subscribe((paymentOrder) => {
      this.ngbActiveModal.close(paymentOrder);
      this.alertService.success('Ordem de pagamento atualizada com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível atualizar a ordem de pagament, por favor tente novamente mais tarde!');
    });
  }
}
