import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {PaymentService} from '@services/payment.service';
import {AlertService} from '@services/alert.service';
import {PaymentOrder} from '@models/payment-order.model';

@Component({
  selector: 'app-delete-payment-order',
  templateUrl: './delete.component.html',
})
export class DeletePaymentOrderComponent {

  @Input()
  public paymentOrder: PaymentOrder;

  public deleting = false;

  constructor(private paymentService: PaymentService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public deletePaymentOrder(): void {
    this.deleting = true;
    this.paymentService.deletePaymentOrder(this.paymentOrder).subscribe(() => {
      this.ngbActiveModal.close();
      this.alertService.success('Ordem de pagamento removida com sucesso!');
    }, (err) => {
      this.deleting = false;
      this.alertService.apiError(null, err, 'Não foi possível remover a ordem de pagamento, por favor tente novamente mais tarde!');
    });
  }
}
