import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap/timepicker/timepicker.module';
import * as getYear from 'date-fns/getYear';
import * as getMonth from 'date-fns/getMonth';
import * as getDate from 'date-fns/getDate';
import values from 'lodash-es/values';

import {ClientService} from 'app/services/client.service';
import {AlertService} from 'app/services/alert.service';
import {Constants} from 'app/utils/constants';
import {onlyDateChars} from 'app/utils/angular.utils';
import {Client} from 'app/models/client.model';
import {Document} from 'app/models/document.model';

@Component({
  selector: 'app-change-document-status',
  templateUrl: './change-document-status.component.html',
})
export class ChangeDocumentStatusComponent implements OnInit {

  @Input()
  public client: Client;
  @Input()
  public document: Document;
  public documentStatus = values(Constants.DOCUMENT_STATUS);
  public selectedStatus: string;
  public selectingDate: boolean;
  public selectedDate: NgbDateStruct;
  public selectedTime: NgbTimeStruct;
  public todayDateStruct: NgbDateStruct;
  public onlyDateChars = onlyDateChars;

  constructor(private clientService: ClientService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    this.selectedStatus = this.document.status;
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
    if (status === Constants.DOCUMENT_STATUS.scheduled.id) {
      this.selectingDate = true;
    }
  }

  public changeStatus(): void {
    this.clientService.updateDocument(this.client, this.document, {status: this.selectedStatus}).subscribe((document) => {
      this.ngbActiveModal.close(document);
      this.alertService.success('Status do documento atualizado com sucesso!');
    }, (err) => {
      this.close();
      this.alertService.apiError(null, err, 'Não foi possível atualizar o status do documento, por favor tente novamente mais tarde!');
    });
  }
}
