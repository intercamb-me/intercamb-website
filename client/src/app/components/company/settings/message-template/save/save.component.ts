import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

  public editor: any = ClassicEditor;
  public editorConfig: any;
  public loading = true;
  public saving = false;

  constructor(private messageTemplateService: MessageTemplateService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    this.editorConfig = {
      toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'insertTable', 'undo', 'redo'],
    };
    if (!this.messageTemplate) {
      this.messageTemplate = new MessageTemplate({
        body: '',
      });
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
      identifier: this.messageTemplate.identifier,
      title: this.messageTemplate.title,
      body: this.messageTemplate.body,
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
      body: this.messageTemplate.body,
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
