/* tslint:disable:variable-name */

import {TaskChecklist} from 'app/models/task-checklist.model';

export class DefaultTask {

  public name: string;
  public checklists: TaskChecklist[];

  constructor(data?: any) {
    if (data) {
      this.name = data.name;
      this.checklists = [];
      if (data.checklists) {
        (data.checklists as any[]).forEach((checklist) => {
          this.checklists.push(new TaskChecklist(checklist));
        });
      }
    }
  }
}
