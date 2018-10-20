import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {MessageTemplateService} from '@services/message-template.service';
import {AlertService} from '@services/alert.service';
import {MessageTemplate} from '@models/message-template.model';

@Component({
  selector: 'app-delete-message-template',
  templateUrl: './delete.component.html',
})
export class DeleteMessageTemplateComponent {

  @Input()
  public messageTemplate: MessageTemplate;

  public deleting = false;

  constructor(private messageTemplateService: MessageTemplateService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public deleteMessageTemplate(): void {
    this.deleting = true;
    this.messageTemplateService.deleteMessageTemplate(this.messageTemplate).subscribe(() => {
      this.ngbActiveModal.close();
      this.alertService.success('Template de e-mail removida com sucesso!');
    }, (err) => {
      this.deleting = false;
      this.alertService.apiError(null, err, 'Não foi possível remover o template de e-mail, por favor tente novamente mais tarde!');
    });
  }
}
