import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {NgbActiveModal, NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import {CompanyService} from '@services/company.service';
import {MessageTemplateService} from '@services/message-template.service';
import {AlertService} from '@services/alert.service';
import {MessageTemplate} from '@models/message-template.model';

@Component({
  selector: 'app-save-message-template',
  templateUrl: './save.component.html',
})
export class SaveMessageTemplateComponent implements OnInit {

  @ViewChild('confirmTestPopover', {read: NgbPopover})
  public confirmTestPopover: NgbPopover;
  @Input()
  public messageTemplate: MessageTemplate;

  public testEmail: string;
  public editor: any = ClassicEditor;
  public editorConfig: any;
  public loading = true;
  public saving = false;

  constructor(private companyService: CompanyService, private messageTemplateService: MessageTemplateService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    this.editorConfig = {
      toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'insertTable', 'undo', 'redo'],
    };
    this.companyService.getCompany({select: 'contact_email'}).pipe(
      mergeMap((company) => {
        this.testEmail = company.contact_email;
        return this.messageTemplate ? this.messageTemplateService.getMessageTemplate(this.messageTemplate.id) : of(new MessageTemplate({
          body: '',
        }));
      })
    ).subscribe((messageTemplate) => {
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

  public testMessageTemplate(): void {
    const data = {
      identifier: this.messageTemplate.identifier,
      title: this.messageTemplate.title,
      body: this.messageTemplate.body,
    };
    this.saving = true;
    this.messageTemplateService.testMessageTemplate(this.testEmail, data).subscribe(() => {
      this.saving = false;
      this.confirmTestPopover.close();
      this.alertService.success(`Um e-mail de teste foi enviado para ${this.testEmail}.`);
    }, (err) => {
      this.saving = false;
      this.alertService.apiError(null, err, 'Não foi possível enviar um e-mail de teste, por favor tente novamente mais tarde!');
    });
  }
}
