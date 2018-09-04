import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';

import {TaskChecklist} from '@models/task-checklist.model';

@Component({
  selector: 'app-task-checklists',
  templateUrl: './checklists.component.html',
})
export class TaskChecklistsComponent {

  @Input()
  set checklists(checklists: TaskChecklist[]) {
    this.formArray = this.formBuilder.array([]);
    checklists.forEach((checklist) => {
      const checklistFormGroup = this.createChecklistFormGroup(checklist.title);
      const checklistItemsFormGroup = checklistFormGroup.get('items') as FormArray;
      checklist.items.forEach((item) => {
        const checklistItemFormGroup = this.createChecklistItemFormGroup(item.name, item.done);
        checklistItemsFormGroup.push(checklistItemFormGroup);
      });
      this.formArray.push(checklistFormGroup);
    });
    this.formArray.statusChanges.subscribe((status) => {
      if (this.formStatus !== status) {
        this.formStatus = status;
        this.statusChanges.emit(this.isFormValid());
      }
    });
    this.formArray.updateValueAndValidity();
  }

  @Input()
  public mode: string;
  @Output()
  public checklistsChanges = new EventEmitter<TaskChecklist[]>();
  @Output()
  public statusChanges = new EventEmitter<boolean>();

  public formArray: FormArray;
  public formStatus: string;

  constructor(private formBuilder: FormBuilder) {

  }

  public editFormGroup(formGroup: FormGroup): void {
    formGroup.get('editing').setValue(true);
  }

  public stopEditingFormGroup(formGroup: FormGroup): void {
    formGroup.get('editing').setValue(false);
    this.emitChecklistsChanges();
  }

  public editItemToAdd(formGroup: FormGroup): void {
    formGroup.get('editing').setValue(true);
    formGroup.get('name').setValue('');
  }

  public stopEditingItemToAdd(formGroup: FormGroup): void {
    formGroup.get('editing').setValue(false);
    formGroup.get('name').setValue('');
  }

  public removeChecklist(checklist: FormGroup): void {
    const index = this.formArray.controls.indexOf(checklist);
    if (index >= 0) {
      this.formArray.removeAt(index);
      this.emitChecklistsChanges();
    }
  }

  public addChecklistItem(checklistItem: FormGroup): void {
    const items = checklistItem.get('items') as FormArray;
    const itemToAdd = checklistItem.get('itemToAdd');
    const itemName = itemToAdd.get('name');
    if (itemName.value) {
      items.push(this.createChecklistItemFormGroup(itemName.value));
      itemName.setValue(null);
      this.emitChecklistsChanges();
    }
  }

  public removeChecklistItem(checklist: FormGroup, checklistItem: FormGroup): void {
    const checklistItems = checklist.get('items') as FormArray;
    const index = checklistItems.controls.indexOf(checklistItem);
    if (index >= 0) {
      checklistItems.removeAt(index);
      this.emitChecklistsChanges();
    }
  }

  public emitChecklistsChanges(): void {
    if (this.isFormValid()) {
      const checklists: TaskChecklist[] = [];
      (this.formArray.value as any[]).forEach((checklist) => {
        checklists.push(new TaskChecklist(checklist));
      });
      this.checklistsChanges.emit(checklists);
    }
  }

  private createChecklistFormGroup(title: string): FormGroup {
    return this.formBuilder.group({
      title: [title, Validators.required],
      editing: [false],
      itemToAdd: this.createChecklistItemFormGroup(null, null, true),
      items: this.formBuilder.array([]),
    });
  }

  private createChecklistItemFormGroup(name?: string, done?: boolean, itemToAdd?: boolean): FormGroup {
    return this.formBuilder.group({
      name: [name, !itemToAdd ? Validators.required : null],
      done: [done],
      editing: [false],
    });
  }

  private isFormValid(): boolean {
    return this.formStatus === 'VALID';
  }
}
