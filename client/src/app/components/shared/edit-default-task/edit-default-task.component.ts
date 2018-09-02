import {Component, OnInit, Input, Output, ViewChild, EventEmitter} from '@angular/core';
import {NgbActiveModal, NgbPopover} from '@ng-bootstrap/ng-bootstrap';

import {Constants} from '@utils/constants';
import {DefaultTask} from '@models/default-task.model';
import {TaskChecklist} from '@models/task-checklist.model';
import {TaskField} from '@models/task-field.model';

@Component({
  selector: 'app-edit-default-task',
  templateUrl: './edit-default-task.component.html',
})
export class EditDefaultTaskComponent implements OnInit {

  @ViewChild('fieldPopover', {read: NgbPopover})
  public fieldPopover: NgbPopover;
  @ViewChild('checklistPopover', {read: NgbPopover})
  public checklistPopover: NgbPopover;
  @Input()
  public defaultTask: DefaultTask;
  @Output()
  public back = new EventEmitter<any>();

  public editingTaskName: boolean;
  public fieldTypes = Object.values(Constants.TASK_FIELD_TYPES);
  public newField: TaskField;
  public newChecklist: TaskChecklist;
  public fieldsValid: boolean;
  public checklistsValid: boolean;

  constructor(private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    this.resetValues();
  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public addField(): void {
    this.defaultTask.fields = [...this.defaultTask.fields, this.newField];
    this.fieldPopover.close();
    this.resetValues();
  }

  public addChecklist(): void {
    this.defaultTask.checklists = [...this.defaultTask.checklists, this.newChecklist];
    this.checklistPopover.close();
    this.resetValues();
  }

  public editTaskName(): void {
    this.editingTaskName = true;
  }

  public stopEditingTaskName(): void {
    this.editingTaskName = false;
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

  private resetValues(): void {
    this.newField = new TaskField({type: Constants.TASK_FIELD_TYPES.text.id});
    this.newChecklist = new TaskChecklist({});
  }
}
