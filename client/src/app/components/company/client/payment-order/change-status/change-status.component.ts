import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import {PaymentService} from '@services/payment.service';
import {AlertService} from '@services/alert.service';
import {CalendarUtils} from '@utils/calendar.utils';
import {Helpers} from '@utils/helpers';
import {PaymentOrder} from '@models/payment-order.model';

@Component({
  selector: 'app-change-payment-order-status',
  templateUrl: './change-status.component.html',
})
export class ChangePaymentOrderStatusComponent implements OnInit {

  @Input()
  public paymentOrder: PaymentOrder;

  public paymentDateStruct: NgbDateStruct;
  public maxPaymentDateStruct: NgbDateStruct;
  public onlyDateChars = Helpers.onlyDateChars;
  public selectingPaymentDate = false;
  public loading = true;
  public saving = false;

  constructor(private paymentService: PaymentService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    this.paymentDateStruct = CalendarUtils.toDateStruct(this.paymentOrder.payment_date);
    this.maxPaymentDateStruct = CalendarUtils.toDateStruct(new Date());
  }

  public trackByIndex(index: number): number {
    return index;
  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public changeStatus(paid: boolean): void {
    if (paid) {
      this.selectingPaymentDate = true;
    } else {
      this.paymentDateStruct = null;
      this.updatePaymentOrder();
    }
  }

  public backToStatusOptions(): void {
    this.selectingPaymentDate = false;
  }

  public updatePaymentOrder(): void {
    this.saving = true;
    const data = {
      payment_date: CalendarUtils.fromDateStruct(this.paymentDateStruct),
    };
    this.paymentService.updatePaymentOrder(this.paymentOrder, data).subscribe((paymentOrder) => {
      this.ngbActiveModal.close(paymentOrder);
      this.alertService.success('Ordem de pagamento atualizada com sucesso!');
    }, (err) => {
      this.saving = false;
      this.alertService.apiError(null, err, 'Não foi possível atualizar a ordem de pagamento, por favor tente novamente mais tarde!');
    });
  }
}
