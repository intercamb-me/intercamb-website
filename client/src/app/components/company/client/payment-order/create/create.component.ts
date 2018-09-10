import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as addMonths from 'date-fns/add_months';

import {CompanyService} from '@services/company.service';
import {PlanService} from '@services/plan.service';
import {ClientService} from '@services/client.service';
import {AlertService} from '@services/alert.service';
import {Constants} from '@utils/constants';
import {CalendarUtils} from '@utils/calendar.utils';
import {Helpers} from '@utils/helpers';
import {Client} from '@models/client.model';
import {Company} from '@models/company.model';
import {Plan} from '@models/plan.model';

interface Split {
  amount: string;
  dueDateStruct: NgbDateStruct;
}

@Component({
  selector: 'app-create-payment-order',
  templateUrl: './create.component.html',
})
export class CreatePaymentOrderComponent implements OnInit {

  @Input()
  public client: Client;

  public company: Company;
  public method: string;
  public amount: string;
  public numberOfSplits = 1;
  public splits: Split[] = [];
  public dueDateStruct: NgbDateStruct;
  public availableMethods = Constants.PAYMENT_METHODS;
  public currencyMask = Constants.CURRENCY_MASK;
  public onlyDateChars = Helpers.onlyDateChars;
  public loading = true;
  public saving = false;

  constructor(private companyService: CompanyService, private planService: PlanService, private clientService: ClientService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    this.companyService.getCompany({select: 'currency'}).pipe(
      mergeMap((company) => {
        this.company = company;
        return this.client.plan_id ? this.planService.getPlan(this.client.plan_id) : of(null);
      })
    ).subscribe((plan: Plan) => {
      if (plan) {
        this.amount = String(plan.price);
      }
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
      this.splits = [];
      const splitAmount = Math.round((Number(this.amount) / this.numberOfSplits) * 100) / 100;
      const splitBaseDate = this.dueDateStruct ? CalendarUtils.fromDateStruct(this.dueDateStruct) : null;
      for (let i = 0; i < this.numberOfSplits; i += 1) {
        const splitDate = splitBaseDate ? addMonths(splitBaseDate, i) : null;
        this.splits.push({
          amount: String(splitAmount),
          dueDateStruct: CalendarUtils.toDateStruct(splitDate),
        });
      }
    }
  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public selectMethod(method: string): void {
    this.method = method;
  }

  public createPaymentOrder(): void {
    this.saving = true;
    const data: any[] = [];
    this.splits.forEach((split) => {
      data.push({
        method: this.method,
        amount: Number(split.amount),
        due_date: CalendarUtils.toDateOnly(CalendarUtils.fromDateStruct(split.dueDateStruct)),
      });
    });
    this.clientService.createPaymentOrders(this.client, data).subscribe((paymentOrders) => {
      this.ngbActiveModal.close(paymentOrders);
      this.alertService.success('Ordens de pagamento adicionadas com sucesso!');
    }, (err) => {
      this.saving = false;
      this.alertService.apiError(null, err, 'Não foi possível adicionar as ordens de pagamento, por favor tente novamente mais tarde!');
    });
  }
}
