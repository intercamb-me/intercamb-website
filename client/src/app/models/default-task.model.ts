/* tslint:disable:variable-name */

import {TaskChecklist} from '@models/task-checklist.model';
import {TaskField} from '@models/task-field.model';

export class DefaultTask {

  public id: string;
  public name: string;
  public company: string;
  public plan: string;
  public fields: TaskField[];
  public checklists: TaskChecklist[];
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.company = data.company;
      this.plan = data.plan;
      this.registration_date = new Date(data.registration_date);
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
