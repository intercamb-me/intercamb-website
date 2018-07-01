import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap/timepicker/timepicker.module';
import * as getYear from 'date-fns/getYear';
import * as setYear from 'date-fns/setYear';
import * as getMonth from 'date-fns/getMonth';
import * as setMonth from 'date-fns/setMonth';
import * as getDate from 'date-fns/getDate';
import * as setDate from 'date-fns/setDate';
import * as setHours from 'date-fns/setHours';
import * as setMinutes from 'date-fns/setMinutes';
import * as setSeconds from 'date-fns/setSeconds';
import * as setMilliseconds from 'date-fns/setMilliseconds';
import values from 'lodash-es/values';

import {ClientService} from 'app/services/client.service';
import {AlertService} from 'app/services/alert.service';
import {Constants} from 'app/utils/constants';
import {onlyDateChars} from 'app/utils/angular.utils';
import {Client} from 'app/models/client.model';
import {Task} from 'app/models/task.model';

@Component({
  selector: 'app-change-task-status',
  templateUrl: './change-task-status.component.html',
})
export class ChangeTaskStatusComponent implements OnInit {

  @Input()
  public client: Client;
  @Input()
  public task: Task;
  public taskStatus = values(Constants.TASK_STATUS);
  public selectedStatus: string;
  public selectingDate: boolean;
  public selectedDateStruct: NgbDateStruct;
  public selectedTimeStruct: NgbTimeStruct;
  public todayDateStruct: NgbDateStruct;
  public onlyDateChars = onlyDateChars;

  constructor(private clientService: ClientService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    this.selectedStatus = this.task.status;
    const now = new Date();
    this.todayDateStruct = {
      year: getYear(now),
      month: getMonth(now) + 1,
      day: getDate(now),
    };
  }

  public trackByIndex(index: number): number {
    return index;
  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public selectStatus(status: string): void {
    this.selectedStatus = status;
    if (status === Constants.TASK_STATUS.scheduled.id) {
      this.selectingDate = true;
    }
  }

  public changeStatus(): void {
    const data: any = {status: this.selectedStatus};
    if (this.selectedStatus === Constants.TASK_STATUS.scheduled.id) {
      let scheduleDate = new Date();
      scheduleDate = setYear(scheduleDate, this.selectedDateStruct.year);
      scheduleDate = setMonth(scheduleDate, this.selectedDateStruct.month);
      scheduleDate = setDate(scheduleDate, this.selectedDateStruct.day);
      scheduleDate = setHours(scheduleDate, this.selectedTimeStruct.hour);
      scheduleDate = setMinutes(scheduleDate, this.selectedTimeStruct.minute);
      scheduleDate = setSeconds(scheduleDate, 0);
      scheduleDate = setMilliseconds(scheduleDate, 0);
      data['properties.schedule_date'] = scheduleDate;
    } else {
      data['properties.schedule_date'] = undefined;
    }
    this.clientService.updateTask(this.client, this.task, data).subscribe((task) => {
      this.ngbActiveModal.close(task);
      this.alertService.success('Status da atividade atualizado com sucesso!');
    }, (err) => {
      this.close();
      this.alertService.apiError(null, err, 'Não foi possível atualizar o status da atividade, por favor tente novamente mais tarde!');
    });
  }
}
