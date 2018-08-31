/* tslint:disable:variable-name */

import {ChecklistItem} from 'app/models/checklist-item.model';

export class TaskChecklist {

  public title: string;
  public items: ChecklistItem[];

  constructor(data?: any) {
    if (data) {
      this.title = data.title;
      this.items = [];
      if (data.items) {
        (data.items as any[]).forEach((item) => {
          this.items.push(new ChecklistItem(item));
        });
      }
    }
  }
}
