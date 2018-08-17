import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal, NgbDateStruct, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import * as getYear from 'date-fns/get_year';
import * as setYear from 'date-fns/set_year';
import * as getMonth from 'date-fns/get_month';
import * as setMonth from 'date-fns/set_month';
import * as getDate from 'date-fns/get_date';
import * as setDate from 'date-fns/set_date';
import * as getHours from 'date-fns/get_hours';
import * as setHours from 'date-fns/set_hours';
import * as getMinutes from 'date-fns/get_minutes';
import * as setMinutes from 'date-fns/set_minutes';
import * as setSeconds from 'date-fns/set_seconds';
import * as setMilliseconds from 'date-fns/set_milliseconds';

import {TaskService} from 'app/services/task.service';
import {AlertService} from 'app/services/alert.service';
import {Helpers} from 'app/utils/helpers';
import {Client} from 'app/models/client.model';
import {Task} from 'app/models/task.model';

@Component({
  selector: 'app-set-schedule-date',
  templateUrl: './set-schedule-date.component.html',
})
export class SetTaskScheduleDateComponent implements OnInit {

  @Input()
  public client: Client;
  @Input()
  public task: Task;

  public selectedDateStruct: NgbDateStruct;
  public selectedTimeStruct: NgbTimeStruct;
  public todayDateStruct: NgbDateStruct;
  public onlyDateChars = Helpers.onlyDateChars;
  public updating = false;

  constructor(private taskService: TaskService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    if (this.task.schedule_date) {
      this.selectedDateStruct = {
        year: getYear(this.task.schedule_date),
        month: getMonth(this.task.schedule_date) + 1,
        day: getDate(this.task.schedule_date),
      };
      this.selectedTimeStruct = {
        hour: getHours(this.task.schedule_date),
        minute: getMinutes(this.task.schedule_date),
        second: 0,
      };
    }
    const now = new Date();
    this.todayDateStruct = {
      year: getYear(now),
      month: getMonth(now) + 1,
      day: getDate(now),
    };
  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public confirmScheduleDate(): void {
    this.updating = true;
    let scheduleDate = new Date();
    scheduleDate = setYear(scheduleDate, this.selectedDateStruct.year);
    scheduleDate = setMonth(scheduleDate, this.selectedDateStruct.month - 1);
    scheduleDate = setDate(scheduleDate, this.selectedDateStruct.day);
    scheduleDate = setHours(scheduleDate, this.selectedTimeStruct.hour);
    scheduleDate = setMinutes(scheduleDate, this.selectedTimeStruct.minute);
    scheduleDate = setSeconds(scheduleDate, 0);
    scheduleDate = setMilliseconds(scheduleDate, 0);
    this.taskService.updateTask(this.task, {schedule_date: scheduleDate}).subscribe((task) => {
      this.ngbActiveModal.close(task);
      this.alertService.success('Data da atividade marcada com sucesso!');
    }, (err) => {
      this.updating = false;
      this.alertService.apiError(null, err, 'Não foi possível marcar a data da atividade, por favor tente novamente mais tarde!');
    });
  }

  public removeScheduleDate(): void {
    this.updating = true;
    this.taskService.updateTask(this.task, {schedule_date: null}).subscribe((task) => {
      this.ngbActiveModal.close(task);
      this.alertService.success('Data da atividade removida com sucesso!');
    }, (err) => {
      this.updating = false;
      this.alertService.apiError(null, err, 'Não foi possível remover a data da atividade, por favor tente novamente mais tarde!');
    });
  }
}
