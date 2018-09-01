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

import {TaskService} from '@services/task.service';
import {AlertService} from '@services/alert.service';
import {Helpers} from '@utils/helpers';
import {Task} from '@models/task.model';

@Component({
  selector: 'app-set-schedule-date',
  templateUrl: './set-schedule-date.component.html',
})
export class SetTaskScheduleDateComponent implements OnInit {

  @Input()
  public task: Task;

  public selectedDateStruct: NgbDateStruct;
  public selectedTimeStruct: NgbTimeStruct;
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
