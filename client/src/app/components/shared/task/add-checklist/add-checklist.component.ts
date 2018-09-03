import {Component, Output, EventEmitter} from '@angular/core';

import {TaskChecklist} from '@models/task-checklist.model';

@Component({
  selector: 'app-add-task-checklist',
  templateUrl: './add-checklist.component.html',
})
export class AddTaskChecklistComponent {

  @Output()
  public add = new EventEmitter<TaskChecklist>();

  public checklist = new TaskChecklist({});

  constructor() {

  }

  public addChecklist(): void {
    this.add.emit(this.checklist);
  }
}
