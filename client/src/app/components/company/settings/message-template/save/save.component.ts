import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {MessageTemplateService} from '@services/message-template.service';
import {AlertService} from '@services/alert.service';
import {MessageTemplate} from '@models/message-template.model';

@Component({
  selector: 'app-save-message-template',
  templateUrl: './save.component.html',
})
export class SaveMessageTemplateComponent implements OnInit {

  @Input()
  public messageTemplate: MessageTemplate;

  public loading = true;
  public saving = false;

  constructor(private messageTemplateService: MessageTemplateService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    if (!this.messageTemplate) {
      this.messageTemplate = new MessageTemplate({});
      this.loading = false;
      return;
    }
    this.messageTemplateService.getMessageTemplate(this.messageTemplate.id).subscribe((messageTemplate) => {
      this.messageTemplate = messageTemplate;
      this.loading = false;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public createMessageTemplate(): void {
    const data = {
      identifier: this.messageTemplate.title,
      title: this.messageTemplate.title,
      template: this.messageTemplate.template,
    };
    this.saving = true;
    this.messageTemplateService.createMessageTemplate(data).subscribe((messageTemplate) => {
      this.ngbActiveModal.close(messageTemplate);
      this.alertService.success('Template de e-mail criado com sucesso!');
    }, (err) => {
      this.saving = false;
      this.alertService.apiError(null, err, 'Não foi possível criar o template de e-mail, por favor tente novamente mais tarde!');
    });
  }

  public updateMessageTemplate(): void {
    const data = {
      identifier: this.messageTemplate.identifier,
      title: this.messageTemplate.title,
      template: this.messageTemplate.template,
    };
    this.saving = true;
    this.messageTemplateService.updateMessageTemplate(this.messageTemplate, data).subscribe((messageTemplate) => {
      this.ngbActiveModal.close(messageTemplate);
      this.alertService.success('Template de e-mail atualizado com sucesso!');
    }, (err) => {
      this.saving = false;
      this.alertService.apiError(null, err, 'Não foi possível atualizar o template de e-mail, por favor tente novamente mais tarde!');
    });
  }
}
