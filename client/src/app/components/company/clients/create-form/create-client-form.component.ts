import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';

import {TokenService} from 'app/services/token.service';
import {AlertService} from 'app/services/alert.service';
import {Token} from 'app/models/token.model';

@Component({
  selector: 'app-create-client-form',
  templateUrl: './create-client-form.component.html',
})
export class CreateClientFormComponent {

  public identifier: string;
  public token: Token;

  constructor(private tokenService: TokenService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public close(): void {
    this.ngbActiveModal.close();
  }

  public createToken(): void {
    this.tokenService.createToken(this.identifier, Token.TYPE_CLIENT_FORM).subscribe((token) => {
      this.token = token;
      this.alertService.success('URL gerada com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível gerar a URL, por favor tente novamente mais tarde!');
    });
  }

  public getFormUrl(): string {
    return `${process.env.WEB_URL}/clients/form/${this.token.id}`;
  }

  public copyFormUrl(): void {
    this.alertService.info('URL copiada!');
  }
}
