import {Component, Output, EventEmitter} from '@angular/core';

import {Constants} from '@utils/constants';
import {TaskField} from '@models/task-field.model';

@Component({
  selector: 'app-add-task-field',
  templateUrl: './add-field.component.html',
})
export class AddTaskFieldComponent {

  @Output()
  public add = new EventEmitter<TaskField>();

  public fieldTypes = Object.values(Constants.TASK_FIELD_TYPES);
  public field = new TaskField({
    type: this.fieldTypes[0].id,
  });

  constructor() {

  }

  public addField(): void {
    this.add.emit(this.field);
  }
}
