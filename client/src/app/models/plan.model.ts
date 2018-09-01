/* tslint:disable:variable-name */

import {DefaultTask} from '@models/default-task.model';

export class Plan {

  public id: string;
  public company: string;
  public name: string;
  public price: number;
  public default_tasks: DefaultTask[];
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.company = data.company;
      this.name = data.name;
      this.price = data.price;
      this.registration_date = new Date(data.registration_date);
      this.default_tasks = [];
      if (data.default_tasks) {
        (data.default_tasks as any[]).forEach((default_task) => {
          this.default_tasks.push(new DefaultTask(default_task));
        });
      }
    }
  }
}
