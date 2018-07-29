import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {mergeMap} from 'rxjs/operators';
import {NgxMasonryOptions} from 'ngx-masonry';

import {AssociatePlanComponent} from 'app/components/company/client/associate-plan/associate-plan.component';
import {CreatePaymentOrderComponent} from 'app/components/company/client/payment-order/create/create.component';
import {EditPaymentOrderComponent} from 'app/components/company/client/payment-order/edit/edit.component';
import {DeletePaymentOrderComponent} from 'app/components/company/client/payment-order/delete/delete.component';
import {ChangePaymentOrderStatusComponent} from 'app/components/company/client/payment-order/change-status/change-status.component';
import {TaskComponent} from 'app/components/company/task/task.component';

import {CompanyService} from 'app/services/company.service';
import {ClientService} from 'app/services/client.service';
import {AlertService} from 'app/services/alert.service';
import {ErrorUtils} from 'app/utils/error.utils';
import {Helpers} from 'app/utils/helpers';
import {Constants} from 'app/utils/constants';
import {Company} from 'app/models/company.model';
import {Client} from 'app/models/client.model';
import {PaymentOrder} from 'app/models/payment-order.model';
import {Task} from 'app/models/task.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
})
export class ClientComponent implements OnInit {

  public company: Company;
  public client: Client;
  public infoStep = 0;
  public loading = true;
  public paymentMethods = Constants.PAYMENT_METHODS;
  public taskStatus = Constants.TASK_STATUS;
  public getColor = Helpers.getColor;

  public masonryOptions: NgxMasonryOptions = {
    itemSelector: '.col-6',
    horizontalOrder: true,
    transitionDuration: '0',
  };

  constructor(private companyService: CompanyService, private clientService: ClientService, private alertService: AlertService, private activatedRoute: ActivatedRoute, private router: Router, private ngbModal: NgbModal) {

  }

  public ngOnInit(): void {
    const clientId = this.activatedRoute.snapshot.paramMap.get('client');
    this.companyService.getCompany().pipe(
      mergeMap((company) => {
        this.company = company;
        return this.clientService.getClient(clientId, {populate: 'plan payment_orders tasks'});
      })
    ).subscribe((client) => {
      this.client = client;
      this.loading = false;
    }, (err) => {
      if (err.code === ErrorUtils.CLIENT_NOT_FOUND) {
        this.router.navigate(['/404'], {
          replaceUrl: false,
          skipLocationChange: true,
        });
      }
      this.alertService.apiError(null, err);
    });
  }

  public trackByPaymentOrder(_index: number, paymentOrder: PaymentOrder): string {
    return paymentOrder.id;
  }

  public trackByTask(_index: number, task: Task): string {
    return task.id;
  }

  public hasIdentityDocument(): boolean {
    const identityCard = this.client.personal_data.identity_document;
    if (identityCard && identityCard.number && identityCard.issuing_authority && identityCard.state) {
      return true;
    }
    return false;
  }

  public hasPlaceOfBirth(): boolean {
    const placeOfBirth = this.client.personal_data.place_of_birth;
    if (placeOfBirth && placeOfBirth.city && placeOfBirth.state) {
      return true;
    }
    return false;
  }

  public nextInfoStep(): void {
    this.infoStep = this.infoStep + 1;
  }

  public previousInfoStep(): void {
    this.infoStep = this.infoStep - 1;
  }

  public isOverduePayment(paymentOrder: PaymentOrder): boolean {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return paymentOrder.due_date && today > paymentOrder.due_date;
  }

  public openAssociatePlan(): void {
    const modalRef = this.ngbModal.open(AssociatePlanComponent, {size: 'lg'});
    modalRef.componentInstance.client = this.client;
    modalRef.result.then((plan) => {
      if (plan) {
        this.client.plan = plan;
        this.client.plan_id = plan.id;
      } else {
        this.client.plan = null;
        this.client.plan_id = null;
      }
    }).catch(() => {
      // Nothing to do...
    });
  }

  public openCreatePaymentOrder(): void {
    const modalRef = this.ngbModal.open(CreatePaymentOrderComponent, {size: 'lg'});
    modalRef.componentInstance.client = this.client;
    modalRef.result.then((paymentOrders) => {
      this.client.payment_orders.push(...paymentOrders);
    }).catch(() => {
      // Nothing to do...
    });
  }

  public openEditPaymentOrder(paymentOrder: PaymentOrder): void {
    const modalRef = this.ngbModal.open(EditPaymentOrderComponent, {size: 'lg'});
    modalRef.componentInstance.paymentOrder = paymentOrder;
    modalRef.result.then((updatedPaymentOrder) => {
      const index = this.client.payment_orders.indexOf(paymentOrder);
      if (index >= 0) {
        this.client.payment_orders[index] = updatedPaymentOrder;
      }
    }).catch(() => {
      // Nothing to do...
    });
  }

  public openDeletePaymentOrder(paymentOrder: PaymentOrder): void {
    const modalRef = this.ngbModal.open(DeletePaymentOrderComponent);
    modalRef.componentInstance.paymentOrder = paymentOrder;
    modalRef.result.then(() => {
      const index = this.client.payment_orders.indexOf(paymentOrder);
      if (index >= 0) {
        this.client.payment_orders.splice(index, 1);
      }
    }).catch(() => {
      // Nothing to do...
    });
  }

  public openChangePaymentOrderStatus(paymentOrder: PaymentOrder): void {
    const modalRef = this.ngbModal.open(ChangePaymentOrderStatusComponent);
    modalRef.componentInstance.paymentOrder = paymentOrder;
    modalRef.result.then((updatedPaymentOrder) => {
      const index = this.client.payment_orders.indexOf(paymentOrder);
      if (index >= 0) {
        this.client.payment_orders[index] = updatedPaymentOrder;
      }
    }).catch(() => {
      // Nothing to do...
    });
  }

  public openTask(task: Task): void {
    const modalRef = this.ngbModal.open(TaskComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.client = this.client;
    modalRef.componentInstance.task = task;
    modalRef.result.then((updatedTask) => {
      const index = this.client.tasks.indexOf(task);
      if (index >= 0) {
        this.client.tasks[index] = updatedTask;
      }
    }).catch(() => {
      // Nothing to do...
    });
  }
}
