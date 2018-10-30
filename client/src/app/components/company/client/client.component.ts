import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {mergeMap} from 'rxjs/operators';
import {NgxMasonryOptions} from 'ngx-masonry';

import {SendMessagesComponent} from '@components/company/client/send-messages/send-messages.component';
import {AssociatePlanComponent} from '@components/company/client/associate-plan/associate-plan.component';
import {CreatePaymentOrderComponent} from '@components/company/client/payment-order/create/create.component';
import {EditPaymentOrderComponent} from '@components/company/client/payment-order/edit/edit.component';
import {DeletePaymentOrderComponent} from '@components/company/client/payment-order/delete/delete.component';
import {ChangePaymentOrderStatusComponent} from '@components/company/client/payment-order/change-status/change-status.component';
import {CreateTaskComponent} from '@components/company/client/create-task/create-task.component';
import {TaskComponent} from '@components/company/task/task.component';
import {DeleteClientComponent} from '@components/company/client/delete/delete.component';

import {CompanyService} from '@services/company.service';
import {ClientService} from '@services/client.service';
import {AlertService} from '@services/alert.service';
import {ErrorUtils} from '@utils/error.utils';
import {Helpers} from '@utils/helpers';
import {Constants} from '@utils/constants';
import {Client} from '@models/client.model';
import {Company} from '@models/company.model';
import {PaymentOrder} from '@models/payment-order.model';
import {Task} from '@models/task.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
})
export class ClientComponent implements OnInit {

  public company: Company;
  public client: Client;
  public paymentOrders: PaymentOrder[];
  public tasks: Task[];
  public planTasks: Task[];
  public infoStep = 0;
  public loading = true;
  public paymentMethods = Constants.PAYMENT_METHODS;
  public taskStatus = Constants.TASK_STATUS;
  public getColor = Helpers.getColor;
  public countFieldsFilled = Helpers.countFieldsFilled;
  public countChecklistItemsDone = Helpers.countChecklistItemsDone;

  public masonryOptions: NgxMasonryOptions = {
    itemSelector: '.col-6',
    horizontalOrder: true,
    transitionDuration: '0',
  };

  constructor(private companyService: CompanyService, private clientService: ClientService, private alertService: AlertService, private activatedRoute: ActivatedRoute, private router: Router, private ngbModal: NgbModal) {

  }

  public ngOnInit(): void {
    const clientId = this.activatedRoute.snapshot.paramMap.get('client');
    this.companyService.getCompany({select: 'currency'}).pipe(
      mergeMap((company) => {
        this.company = company;
        return this.clientService.getClient(clientId, {populate: 'intended_course>institution plan payment_orders tasks'});
      })
    ).subscribe((client) => {
      this.client = client;
      this.paymentOrders = client.payment_orders;
      this.setTasks(client.tasks);
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

  public nextInfoStep(): void {
    this.infoStep += 1;
  }

  public previousInfoStep(): void {
    this.infoStep = this.infoStep - 1;
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

  public getAge(): number {
    const ageDiff = Date.now() - this.client.personal_data.birthdate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  public isOverduePayment(paymentOrder: PaymentOrder): boolean {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return paymentOrder.due_date && today > paymentOrder.due_date;
  }

  public openSendMessages(): void {
    const modalRef = this.ngbModal.open(SendMessagesComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.client = this.client;
  }

  public openAssociatePlan(): void {
    const modalRef = this.ngbModal.open(AssociatePlanComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.client = this.client;
    modalRef.result.then((plan) => {
      if (plan) {
        this.client.plan = plan;
        this.client.plan_id = plan.id;
      } else {
        this.client.plan = null;
        this.client.plan_id = null;
      }
      this.clientService.listTasks(this.client).subscribe((tasks) => {
        this.setTasks(tasks);
      }, (err) => {
        this.alertService.apiError(null, err, 'Não foi possível atualizar as atividades, por favor recarregue a página!');
      });
    }).catch(() => {
      // Nothing to do...
    });
  }

  public openCreatePaymentOrder(): void {
    const modalRef = this.ngbModal.open(CreatePaymentOrderComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.client = this.client;
    modalRef.result.then((paymentOrders) => {
      this.client.payment_orders.push(...paymentOrders);
    }).catch(() => {
      // Nothing to do...
    });
  }

  public openEditPaymentOrder(paymentOrder: PaymentOrder): void {
    const modalRef = this.ngbModal.open(EditPaymentOrderComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
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
    const modalRef = this.ngbModal.open(DeletePaymentOrderComponent, {
      backdrop: 'static',
      keyboard: false,
    });
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
    const modalRef = this.ngbModal.open(ChangePaymentOrderStatusComponent, {
      backdrop: 'static',
      keyboard: false,
    });
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

  public openCreateTask(): void {
    const modalRef = this.ngbModal.open(CreateTaskComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.client = this.client;
    modalRef.result.then((task) => {
      this.client.tasks.push(task);
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
      const index = this.tasks.indexOf(task);
      if (index >= 0) {
        if (updatedTask) {
          this.tasks[index] = updatedTask;
        } else {
          this.tasks.splice(index, 1);
        }
      }
    }).catch(() => {
      // Nothing to do...
    });
  }

  public openDeleteClient(): void {
    const modalRef = this.ngbModal.open(DeleteClientComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.client = this.client;
    modalRef.result.then(() => {
      this.router.navigate(['/company', 'clients']);
    }).catch(() => {
      // Nothing to do...
    });
  }

  private setTasks(tasks: Task[]): void {
    this.tasks = [];
    this.planTasks = [];
    tasks.forEach((task) => {
      if (task.plan_id) {
        this.planTasks.push(task);
      } else {
        this.tasks.push(task);
      }
    });
  }
}
