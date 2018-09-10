import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import {CompanyService} from '@services/company.service';
import {PaymentService} from '@services/payment.service';
import {AlertService} from '@services/alert.service';
import {Constants} from '@utils/constants';
import {CalendarUtils} from '@utils/calendar.utils';
import {Helpers} from '@utils/helpers';
import {Company} from '@models/company.model';
import {PaymentOrder} from '@models/payment-order.model';

@Component({
  selector: 'app-edit-payment-order',
  templateUrl: './edit.component.html',
})
export class EditPaymentOrderComponent implements OnInit {

  @Input()
  public paymentOrder: PaymentOrder;

  public company: Company;
  public method: string;
  public amount: string;
  public dueDateStruct: NgbDateStruct;
  public currencyMask = Constants.CURRENCY_MASK;
  public availableMethods = Constants.PAYMENT_METHODS;
  public onlyDateChars = Helpers.onlyDateChars;
  public loading = true;
  public saving = false;

  constructor(private companyService: CompanyService, private paymentService: PaymentService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    this.method = this.paymentOrder.method;
    this.amount = String(this.paymentOrder.amount);
    this.dueDateStruct = CalendarUtils.toDateStruct(this.paymentOrder.due_date);
    this.companyService.getCompany({select: 'currency'}).subscribe((company) => {
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
    this.saving = true;
    const data = {
      method: this.method,
      amount: Number(this.amount),
      due_date: CalendarUtils.fromDateStruct(this.dueDateStruct),
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
