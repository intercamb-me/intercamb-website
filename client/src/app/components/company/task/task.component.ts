import {Component, OnInit, Input} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {mergeMap} from 'rxjs/operators';

import {ChangeTaskStatusComponent} from 'app/components/company/task/change-status/change-task-status.component';

import {CompanyService} from 'app/services/company.service';
import {ClientService} from 'app/services/client.service';
import {AlertService} from 'app/services/alert.service';
import {Constants} from 'app/utils/constants';
import {Account} from 'app/models/account.model';
import {Client} from 'app/models/client.model';
import {Task} from 'app/models/task.model';
import {TaskComment} from 'app/models/task-comment.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {

  @Input()
  public client: Client;
  @Input()
  public task: Task;

  public accounts = new Map<string, Account>();
  public taskStatus = Constants.TASK_STATUS;
  public comment = '';
  public commentRows = 1;

  constructor(private companyService: CompanyService, private clientService: ClientService, private alertService: AlertService, private ngbModal: NgbModal, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    this.companyService.listCurrentCompanyAccounts().pipe(
      mergeMap((accounts) => {
        accounts.forEach((account) => {
          this.accounts.set(account.id, account);
        });
        return this.clientService.getTask(this.client, this.task.id);
      })
    ).subscribe((task) => {
      this.task = task;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public trackByComment(_index: number, comment: TaskComment): string {
    return comment.id;
  }

  public close(): void {
    this.ngbActiveModal.close(this.task);
  }

  public openChangeStatus(): void {
    const modalRef = this.ngbModal.open(ChangeTaskStatusComponent);
    modalRef.componentInstance.client = this.client;
    modalRef.componentInstance.task = this.task;
    modalRef.result.then((updatedTask) => {
      this.task = updatedTask;
    }).catch(() => {
      // Nothing to do...
    });
  }

  public onCommentKeyPress(event: KeyboardEvent): void {
    const keyCode = event.which || event.keyCode;
    if (!event.shiftKey && keyCode === 13) {
      this.clientService.addTaskComment(this.client, this.task, this.comment).subscribe((comment) => {
        this.task.comments.push(comment);
      }, (err) => {
        this.alertService.apiError(null, err);
      });
      const textarea = event.target as HTMLTextAreaElement;
      textarea.focus();
      setTimeout(() => {
        textarea.setSelectionRange(0, 0);
        this.comment = '';
        this.commentRows = 1;
      }, 0);
    }
  }

  public onCommentKeyUp(): void {
    const breakLinesCount = (this.comment.match(/\n/g) || []).length + 1;
    this.commentRows = breakLinesCount;
  }
}
