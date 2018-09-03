import {Component, Input, Output, ViewChild, EventEmitter} from '@angular/core';
import {NgbActiveModal, NgbPopover} from '@ng-bootstrap/ng-bootstrap';

import {Constants} from '@utils/constants';
import {DefaultTask} from '@models/default-task.model';
import {TaskChecklist} from '@models/task-checklist.model';
import {TaskField} from '@models/task-field.model';

@Component({
  selector: 'app-edit-default-task',
  templateUrl: './edit-default-task.component.html',
})
export class EditDefaultTaskComponent {

  @ViewChild('addFieldPopover', {read: NgbPopover})
  public addFieldPopover: NgbPopover;
  @ViewChild('addChecklistPopover', {read: NgbPopover})
  public addChecklistPopover: NgbPopover;
  @Input()
  public defaultTask: DefaultTask;
  @Output()
  public back = new EventEmitter<any>();

  public editingTaskName: boolean;
  public fieldTypes = Object.values(Constants.TASK_FIELD_TYPES);
  public fieldsValid: boolean;
  public checklistsValid: boolean;

  constructor(private ngbActiveModal: NgbActiveModal) {

  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public editTaskName(): void {
    this.editingTaskName = true;
  }

  public stopEditingTaskName(): void {
    this.editingTaskName = false;
  }

  public onFieldAdded(field: TaskField): void {
    this.defaultTask.fields = [...this.defaultTask.fields, field];
    this.addFieldPopover.close();
  }

  public onChecklistAdded(checklist: TaskChecklist): void {
    this.defaultTask.checklists = [...this.defaultTask.checklists, checklist];
    this.addChecklistPopover.close();
  }

  public onFieldsChanged(fields: TaskField[]): void {
    this.defaultTask.fields = [...fields];
  }

  public onFieldsStatusChanged(valid: boolean): void {
    this.fieldsValid = valid;
  }

  public onChecklistsChanged(checklists: TaskChecklist[]): void {
    this.defaultTask.checklists = [...checklists];
  }

  public onChecklistsStatusChanged(valid: boolean): void {
    this.checklistsValid = valid;
  }

  public backToDefaultTasks(): void {
    this.back.emit();
  }
}
