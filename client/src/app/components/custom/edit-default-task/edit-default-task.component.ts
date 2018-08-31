import {Component, OnInit, Input, Output, ViewChild, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {NgbActiveModal, NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import cloneDeep from 'lodash-es/cloneDeep';

import {DefaultTask} from 'app/models/default-task.model';

@Component({
  selector: 'app-edit-default-task',
  templateUrl: './edit-default-task.component.html',
})
export class EditDefaultTaskComponent implements OnInit {

  @ViewChild(NgbPopover)
  public popover: NgbPopover;
  @Input()
  public defaultTask: DefaultTask;
  @Output()
  public save = new EventEmitter<any>();
  @Output()
  public back = new EventEmitter<any>();

  public checklistTitle: string;
  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    const checklistsFormGroup = this.formBuilder.array([]);
    this.defaultTask.checklists.forEach((checklist) => {
      const checklistFormGroup = this.createChecklistFormGroup(checklist.title);
      const checklistItemsFormGroup = checklistFormGroup.get('items') as FormArray;
      checklist.items.forEach((item) => {
        const checklistItemFormGroup = this.createChecklistItemFormGroup(item.name);
        checklistItemsFormGroup.push(checklistItemFormGroup);
      });
      checklistsFormGroup.push(checklistFormGroup);
    });
    this.formGroup = this.formBuilder.group({
      name: [this.defaultTask.name, Validators.required],
      editing: [false],
      checklists: checklistsFormGroup,
    });

  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public editFormGroup(formGroup: FormGroup): void {
    formGroup.get('editing').setValue(true);
  }

  public stopEditingFormGroup(formGroup: FormGroup): void {
    formGroup.get('editing').setValue(false);
  }

  public editItemToAdd(formGroup: FormGroup): void {
    formGroup.get('editing').setValue(true);
    const itemName = formGroup.get('name');
    itemName.setValue('');
    itemName.setValidators(Validators.required);
    itemName.updateValueAndValidity();
  }

  public stopEditingItemToAdd(formGroup: FormGroup): void {
    formGroup.get('editing').setValue(false);
    const itemName = formGroup.get('name');
    itemName.setValue('');
    itemName.clearValidators();
    itemName.updateValueAndValidity();
  }

  public addChecklist(): void {
    if (this.checklistTitle) {
      const checklist = this.createChecklistFormGroup(this.checklistTitle);
      const checklists = this.formGroup.get('checklists') as FormArray;
      checklists.push(checklist);
      this.checklistTitle = null;
      this.popover.close();
    }
  }

  public removeChecklist(checklist: FormGroup): void {
    const checklists = this.formGroup.get('checklists') as FormArray;
    const index = checklists.controls.indexOf(checklist);
    if (index >= 0) {
      checklists.removeAt(index);
    }
  }

  public addChecklistItem(checklistItem: FormGroup): void {
    const items = checklistItem.get('items') as FormArray;
    const itemToAdd = checklistItem.get('itemToAdd');
    const itemName = itemToAdd.get('name');
    if (itemName.value) {
      items.push(this.createChecklistItemFormGroup(itemName.value));
      itemName.setValue(null);
    }
  }

  public removeChecklistItem(checklist: FormGroup, checklistItem: FormGroup): void {
    const checklistItems = checklist.get('items') as FormArray;
    const index = checklistItems.controls.indexOf(checklistItem);
    if (index >= 0) {
      checklistItems.removeAt(index);
    }
  }

  public saveDefaultTask(): void {
    const formData = cloneDeep(this.formGroup.value);
    const defaultTask = new DefaultTask(formData);
    this.save.emit(defaultTask);
  }

  public backToDefaultTasks(): void {
    this.back.emit();
  }

  private createChecklistFormGroup(title: string): FormGroup {
    return this.formBuilder.group({
      title: [title, Validators.required],
      editing: [false],
      itemToAdd: this.createChecklistItemFormGroup('', true),
      items: this.formBuilder.array([]),
    });
  }

  private createChecklistItemFormGroup(name?: string, itemToAdd?: boolean): FormGroup {
    return this.formBuilder.group({
      name: [name, !itemToAdd ? Validators.required : null],
      editing: [false],
    });
  }
}
