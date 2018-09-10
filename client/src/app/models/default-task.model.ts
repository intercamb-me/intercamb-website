/* tslint:disable:variable-name */

import {TaskChecklist} from '@models/task-checklist.model';
import {TaskField} from '@models/task-field.model';

export class DefaultTask {

  public id: string;
  public name: string;
  public fields: TaskField[];
  public checklists: TaskChecklist[];

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.fields = [];
      if (data.fields) {
        (data.fields as any[]).forEach((field) => {
          this.fields.push(new TaskField(field));
        });
      }
      this.checklists = [];
      if (data.checklists) {
        (data.checklists as any[]).forEach((checklist) => {
          this.checklists.push(new TaskChecklist(checklist));
        });
      }
    }
  }
}
