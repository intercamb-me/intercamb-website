import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';

import {CompanyService} from 'app/services/company.service';
import {AlertService} from 'app/services/alert.service';
import {Account} from 'app/models/account.model';

@Component({
  selector: 'app-remove-account',
  templateUrl: './remove-account.component.html',
})
export class RemoveAccountComponent {

  @Input()
  public account: Account;

  public removing = false;

  constructor(private companyService: CompanyService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public removeAccount(): void {
    this.removing = true;
    this.companyService.removeAccount(this.account).subscribe(() => {
      this.ngbActiveModal.close();
      this.alertService.success('Conta removida com sucesso!');
    }, (err) => {
      this.removing = false;
      this.alertService.apiError(null, err, 'Não foi possível remover a conta, por favor tente novamente mais tarde!');
    });
  }
}
