import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

import {CompanyService} from 'app/services/company.service';
import {PaymentService} from 'app/services/payment.service';
import {AlertService} from 'app/services/alert.service';
import {Constants} from 'app/utils/constants';
import {DateUtils} from 'app/utils/date.utils';
import {onlyDateChars} from 'app/utils/helpers';
import {Company} from 'app/models/company.model';
import {PaymentOrder} from 'app/models/payment-order.model';

@Component({
  selector: 'app-edit-payment-order',
  templateUrl: './edit.component.html',
})
export class EditPaymentOrderComponent implements OnInit {

  @Input()
  public paymentOrder: PaymentOrder;

  public company: Company;
  public method: string;
  public amount: number;
  public dueDateStruct: NgbDateStruct;
  public availableMethods = Constants.PAYMENT_METHODS;
  public onlyDateChars = onlyDateChars;
  public loading = true;

  constructor(private companyService: CompanyService, private paymentService: PaymentService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    this.method = this.paymentOrder.method;
    this.amount = this.paymentOrder.amount;
    this.dueDateStruct = DateUtils.toDateStruct(this.paymentOrder.due_date);
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

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public selectMethod(method: string): void {
    this.method = method;
  }

  public updatePaymentOrder(): void {
    const data = {
      method: this.method,
      amount: this.amount,
      due_date: DateUtils.fromDateStruct(this.dueDateStruct),
    };
    this.paymentService.updatePaymentOrder(this.paymentOrder, data).subscribe((paymentOrder) => {
      this.ngbActiveModal.close(paymentOrder);
      this.alertService.success('Ordem de pagamento atualizada com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível atualizar a ordem de pagament, por favor tente novamente mais tarde!');
    });
  }
}
