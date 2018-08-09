import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AccountService} from 'app/services/account.service';
import {AlertService} from 'app/services/alert.service';
import {EventService} from 'app/services/event.service';
import {ErrorUtils} from 'app/utils/error.utils';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SignInComponent implements OnInit {

  public email: string;
  public password: string;
  public loading = true;
  public signingIn = false;

  constructor(private accountService: AccountService, private alertService: AlertService, private eventService: EventService, private router: Router) {

  }

  public ngOnInit(): void {
    this.accountService.getAccount().subscribe((account) => {
      if (account && account.company) {
        this.router.navigate(['/company']);
        return;
      }
      if (account) {
        this.router.navigate(['/company', 'setup']);
        return;
      }
      this.loading = false;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public signIn(): void {
    this.signingIn = true;
    this.accountService.login(this.email, this.password).subscribe((account) => {
      this.eventService.publish(EventService.EVENT_ACCOUNT_CHANGED, account);
      this.router.navigate(['/company']);
    }, (err) => {
      this.signingIn = false;
      this.alertService.apiError(ErrorUtils.CONTEXT_AUTHENTICATION, err, 'Não foi possível acessar a conta, por favor tente novamente mais tarde!');
    });
  }
}
