import {Component, OnInit, Input} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {mergeMap} from 'rxjs/operators';
import * as distanceInWordsStrict from 'date-fns/distance_in_words_strict';

import {ChangeTaskStatusComponent} from 'app/components/company/task/change-status/change-status.component';
import {SetTaskScheduleDateComponent} from 'app/components/company/task/set-schedule-date/set-schedule-date.component';
import {SetTaskLocationComponent} from 'app/components/company/task/set-location/set-location.component';
import {DeleteTaskComponent} from 'app/components/company/task/delete/delete.component';

import {AccountService} from 'app/services/account.service';
import {TaskService} from 'app/services/task.service';
import {AlertService} from 'app/services/alert.service';
import {Constants} from 'app/utils/constants';
import {StorageUtils} from 'app/utils/storage.utils';
import {Account} from 'app/models/account.model';
import {Client} from 'app/models/client.model';
import {Task} from 'app/models/task.model';
import {TaskAttachment} from 'app/models/task-attachment.model';
import {TaskComment} from 'app/models/task-comment.model';
import {TaskCounters} from 'app/models/task-counters.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {

  @Input()
  public client: Client;
  @Input()
  public task: Task;

  public account: Account;
  public attachments: TaskAttachment[];
  public comments: TaskComment[];
  public counters: TaskCounters;
  public taskStatus = Constants.TASK_STATUS;
  public comment = '';
  public commentRows = 1;
  public loading = true;

  constructor(private accountService: AccountService, private taskService: TaskService, private alertService: AlertService, private ngbModal: NgbModal, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    this.taskService.getTask(this.task.id, {populate: 'attachments.account comments.account'}).pipe(
      mergeMap((task) => {
        this.task = task;
        this.attachments = task.attachments;
        this.comments = task.comments;
        this.counters = task.counters;
        return this.accountService.getAccount();
      })
    ).subscribe((account) => {
      this.account = account;
      this.loading = false;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public trackByComment(_index: number, comment: TaskComment): string {
    return comment.id;
  }

  public trackByAttachment(_index: number, attachment: TaskAttachment): string {
    return attachment.id;
  }

  public close(): void {
    this.task.attachments = this.attachments;
    this.task.comments = this.comments;
    this.task.counters = this.counters;
    this.ngbActiveModal.close(this.task);
  }

  public isImageAttachment(attachment: TaskAttachment): boolean {
    return attachment.type.startsWith('image');
  }

  public getAttachmentType(attachment: TaskAttachment): string {
    const typeSplit = attachment.type.split('/');
    if (typeSplit.length > 1) {
      return typeSplit[1];
    }
    return typeSplit[0];
  }

  public getAttachmentSize(attachment: TaskAttachment): string {
    const sizeInMB = attachment.size / 1000000;
    return `${Math.round(sizeInMB * 100) / 100} MB`;
  }

  public formatDate(date: Date): string {
    return distanceInWordsStrict(date, new Date());
  }

  public openChangeStatus(): void {
    const modalRef = this.ngbModal.open(ChangeTaskStatusComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.task = this.task;
    modalRef.result.then((updatedTask) => {
      this.task = updatedTask;
    }).catch(() => {
      // Nothing to do...
    });
  }

  public openSetScheduleDate(): void {
    const modalRef = this.ngbModal.open(SetTaskScheduleDateComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.task = this.task;
    modalRef.result.then((updatedTask) => {
      this.task = updatedTask;
    }).catch(() => {
      // Nothing to do...
    });
  }

  public openSetLocation(): void {
    const modalRef = this.ngbModal.open(SetTaskLocationComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.task = this.task;
    modalRef.result.then((updatedTask) => {
      this.task = updatedTask;
    }).catch(() => {
      // Nothing to do...
    });
  }

  public openDeleteTask(): void {
    const modalRef = this.ngbModal.open(DeleteTaskComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.task = this.task;
    modalRef.result.then(() => {
      this.ngbActiveModal.close();
    }).catch(() => {
      // Nothing to do...
    });
  }

  public onCommentKeyPress(event: KeyboardEvent): void {
    const keyCode = event.which || event.keyCode;
    if (!event.shiftKey && keyCode === 13) {
      this.taskService.addTaskComment(this.task, this.comment).subscribe((comment) => {
        comment.account = this.account;
        this.counters.comments += 1;
        this.comments.push(comment);
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

  public addTaskAttachment(event: any): void {
    const file = event.target.files[0];
    this.taskService.addTaskAttachment(this.task, file).subscribe((attachment) => {
      attachment.account = this.account;
      this.counters.attachments += 1;
      this.attachments.push(attachment);
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível enviar o arquivo, por favor tente novamente mais tarde!');
    });
  }

  public openTaskAttachment(attachment: TaskAttachment): void {
    const win = window.open();
    win.location.href = `${process.env.API_URL}/attachments/${attachment.id}/file?access_token=${StorageUtils.getApiToken()}`;
  }
}
