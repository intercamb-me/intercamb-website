import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {NgbPopover, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {mergeMap} from 'rxjs/operators';
import * as distanceInWordsStrict from 'date-fns/distance_in_words_strict';

import {AccountService} from '@services/account.service';
import {TaskService} from '@services/task.service';
import {AlertService} from '@services/alert.service';
import {Constants} from '@utils/constants';
import {Helpers} from '@utils/helpers';
import {StorageUtils} from '@utils/storage.utils';
import {Account} from '@models/account.model';
import {Client} from '@models/client.model';
import {Task} from '@models/task.model';
import {TaskField} from '@models/task-field.model';
import {TaskChecklist} from '@models/task-checklist.model';
import {TaskAttachment} from '@models/task-attachment.model';
import {TaskComment} from '@models/task-comment.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {

  @ViewChild('changeStatusPopover', {read: NgbPopover})
  public changeStatusPopover: NgbPopover;
  @ViewChild('setScheduleDatePopover', {read: NgbPopover})
  public setScheduleDatePopover: NgbPopover;
  @ViewChild('setLocationPopover', {read: NgbPopover})
  public setLocationPopover: NgbPopover;
  @ViewChild('addFieldPopover', {read: NgbPopover})
  public addFieldPopover: NgbPopover;
  @ViewChild('addChecklistPopover', {read: NgbPopover})
  public addChecklistPopover: NgbPopover;
  @ViewChild('removeTaskPopover', {read: NgbPopover})
  public removeTaskPopover: NgbPopover;
  @Input()
  public client: Client;
  @Input()
  public task: Task;

  public account: Account;
  public attachments: TaskAttachment[];
  public comments: TaskComment[];
  public taskStatus = Constants.TASK_STATUS;
  public comment = '';
  public commentRows = 1;
  public editingTaskName = false;
  public loading = true;
  public countFieldsFilled = Helpers.countFieldsFilled;
  public countChecklistItemsDone = Helpers.countChecklistItemsDone;

  constructor(private accountService: AccountService, private taskService: TaskService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    this.taskService.getTask(this.task.id, {populate: 'attachments.account comments.account'}).pipe(
      mergeMap((task) => {
        this.task = task;
        this.attachments = task.attachments;
        this.comments = task.comments;
        return this.accountService.getAccount();
      })
    ).subscribe((account) => {
      this.account = account;
      this.loading = false;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public trackByIndex(index: number): number {
    return index;
  }

  public trackByComment(_index: number, comment: TaskComment): string {
    return comment.id;
  }

  public trackByAttachment(_index: number, attachment: TaskAttachment): string {
    return attachment.id;
  }

  public close(): void {
    this.ngbActiveModal.close(this.task);
  }

  public editTaskName(): void {
    this.editingTaskName = true;
  }

  public stopEditingTaskName(): void {
    this.editingTaskName = false;
    if (this.task.name) {
      this.taskService.updateTask(this.task, {name: this.task.name}).subscribe((task) => {
        this.task = task;
      }, (err) => {
        this.alertService.apiError(null, err, 'Não foi possível atualizar o nome da atividade, por favor tente novamente mais tarde!');
      });
    }
  }

  public formatDate(date: Date): string {
    return distanceInWordsStrict(date, new Date());
  }

  public onStatusChanged(task: Task): void {
    this.task = task;
    this.changeStatusPopover.close();
  }

  public onScheduleDateUpdated(task: Task): void {
    this.task = task;
    this.setScheduleDatePopover.close();
  }

  public onLocationUpdated(task: Task): void {
    this.task = task;
    this.setLocationPopover.close();
  }

  public onFieldAdded(field: TaskField): void {
    this.task.fields.push(field);
    this.onFieldsChanged(this.task.fields);
    this.addFieldPopover.close();
  }

  public onChecklistAdded(checklist: TaskChecklist): void {
    this.task.checklists.push(checklist);
    this.onChecklistsChanged(this.task.checklists);
    this.addChecklistPopover.close();
  }

  public onTaskRemoved(): void {
    this.removeTaskPopover.close();
    this.ngbActiveModal.close();
  }

  public onFieldsChanged(fields: TaskField[]): void {
    this.task.fields = [...fields];
    this.taskService.updateTask(this.task, {fields: this.task.fields}).subscribe((task) => {
      this.task = task;
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível atualizar o campo, por favor tente novamente mais tarde!');
    });
  }

  public onChecklistsChanged(checklists: TaskChecklist[]): void {
    this.task.checklists = [...checklists];
    this.taskService.updateTask(this.task, {checklists: this.task.checklists}).subscribe((task) => {
      this.task = task;
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível atualizar o checklist, por favor tente novamente mais tarde!');
    });
  }

  public addTaskAttachment(event: any): void {
    const file = event.target.files[0];
    this.taskService.addTaskAttachment(this.task, file).subscribe((attachment) => {
      attachment.account = this.account;
      this.task.counters.attachments += 1;
      this.attachments.push(attachment);
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível enviar o arquivo, por favor tente novamente mais tarde!');
    });
  }

  public openTaskAttachment(attachment: TaskAttachment): void {
    const win = window.open();
    win.location.href = `${process.env.API_URL}/tasks/attachments/${attachment.id}/file?access_token=${StorageUtils.getApiToken()}`;
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

  public onCommentKeyPress(event: KeyboardEvent): void {
    const keyCode = event.which || event.keyCode;
    if (!event.shiftKey && keyCode === 13) {
      this.taskService.addTaskComment(this.task, this.comment).subscribe((comment) => {
        comment.account = this.account;
        this.task.counters.comments += 1;
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
}
