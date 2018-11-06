import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {mergeMap} from 'rxjs/operators';

import {CompanyService} from '@services/company.service';
import {ClientService} from '@services/client.service';
import {MessageTemplateService} from '@services/message-template.service';
import {AlertService} from '@services/alert.service';
import {Company} from '@models/company.model';
import {Client} from '@models/client.model';
import {MessageTemplate} from '@models/message-template.model';

@Component({
  selector: 'app-send-messages',
  templateUrl: './send-messages.component.html',
})
export class SendMessagesComponent implements OnInit {

  @Input()
  public client: Client;

  public company: Company;
  public loading = true;
  public sending = false;

  constructor(private companyService: CompanyService, private clientService: ClientService, private messageTemplateService: MessageTemplateService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    this.companyService.getCompany({populate: 'message_templates'}).pipe(
      mergeMap((company) => {
        this.company = company;
        return this.clientService.getClient(this.client.id, {select: 'metadata'});
      })
    ).subscribe((client) => {
      this.client = client;
      this.loading = false;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public trackByMessageTemplate(_index: number, messageTemplate: MessageTemplate): string {
    return messageTemplate.id;
  }

  public messageTemplateWasSent(messageTemplate: MessageTemplate): boolean {
    return this.client.metadata.messages_sent.has(messageTemplate.id);
  }

  public sendMessageTemplate(messageTemplate: MessageTemplate): void {
    this.sending = true;
    this.messageTemplateService.sendMessageTemplate(messageTemplate, this.client).subscribe(() => {
      this.client.metadata.messages_sent.add(messageTemplate.id);
      this.alertService.success('E-mail enviado com sucesso!');
    }, (err) => {
      this.sending = false;
      this.alertService.apiError(null, err, 'Não foi possível enviar o e-mail, por favor tente novamente mais tarde!');
    });
  }
}
