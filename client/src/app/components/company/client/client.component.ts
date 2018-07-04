import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {mergeMap} from 'rxjs/operators';
import {NgxMasonryOptions} from 'ngx-masonry';

import {TaskComponent} from 'app/components/company/task/task.component';

import {ClientService} from 'app/services/client.service';
import {AlertService} from 'app/services/alert.service';
import {Constants} from 'app/utils/constants';
import {Client} from 'app/models/client.model';
import {Task} from 'app/models/task.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
})
export class ClientComponent implements OnInit {

  public client: Client;
  public tasks: Task[];
  public loading = true;
  public clientInfoIndex = 0;

  public taskStatus = Constants.TASK_STATUS;

  public masonryOptions: NgxMasonryOptions = {
    itemSelector: '.col-6',
    horizontalOrder: true,
    transitionDuration: '0',
  };

  constructor(private clientService: ClientService, private alertService: AlertService, private activatedRoute: ActivatedRoute, private ngbModal: NgbModal) {

  }

  public ngOnInit(): void {
    const clientId = this.activatedRoute.snapshot.paramMap.get('client');
    this.clientService.getClient(clientId).pipe(
      mergeMap((client) => {
        this.client = client;
        return this.clientService.listTasks(client);
      })
    ).subscribe((tasks) => {
      this.tasks = tasks;
      this.loading = false;
    }, (err) => {
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

  public nextClientInfo(): void {
    this.clientInfoIndex = this.clientInfoIndex + 1;
  }

  public previousClientInfo(): void {
    this.clientInfoIndex = this.clientInfoIndex - 1;
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
