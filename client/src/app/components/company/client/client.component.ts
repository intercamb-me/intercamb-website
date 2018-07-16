import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {NgxMasonryOptions} from 'ngx-masonry';

import {AssociatePlanComponent} from 'app/components/company/client/associate-plan/associate-plan.component';
import {TaskComponent} from 'app/components/company/task/task.component';

import {ClientService} from 'app/services/client.service';
import {PlanService} from 'app/services/plan.service';
import {AlertService} from 'app/services/alert.service';
import {ErrorUtils} from 'app/utils/error.utils';
import {Constants} from 'app/utils/constants';
import {Client} from 'app/models/client.model';
import {Task} from 'app/models/task.model';
import {Plan} from 'app/models/plan.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
})
export class ClientComponent implements OnInit {

  public client: Client;
  public plan: Plan;
  public tasks: Task[];
  public infoStep = 0;
  public loading = true;

  public taskStatus = Constants.TASK_STATUS;

  public masonryOptions: NgxMasonryOptions = {
    itemSelector: '.col-6',
    horizontalOrder: true,
    transitionDuration: '0',
  };

  constructor(private clientService: ClientService, private planService: PlanService, private alertService: AlertService, private activatedRoute: ActivatedRoute, private router: Router, private ngbModal: NgbModal) {

  }

  public ngOnInit(): void {
    const clientId = this.activatedRoute.snapshot.paramMap.get('client');
    this.clientService.getClient(clientId).pipe(
      mergeMap((client) => {
        this.client = client;
        return this.client.plan ? this.planService.getPlan(this.client.plan) : of(null);
      }),
      mergeMap((plan) => {
        this.plan = plan;
        return this.clientService.listTasks(this.client);
      })
    ).subscribe((tasks) => {
      this.tasks = tasks;
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

  public openAssociatePlan(): void {
    const modalRef = this.ngbModal.open(AssociatePlanComponent, {size: 'lg'});
    modalRef.componentInstance.client = this.client;
    modalRef.result.then((plan) => {
      this.plan = plan;
      this.client.plan = plan ? plan.id : null;
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
      const index = this.tasks.findIndex((currentTask) => {
        return currentTask.id === updatedTask.id;
      });
      this.tasks[index] = updatedTask;
    }).catch(() => {
      // Nothing to do...
    });
  }
}
