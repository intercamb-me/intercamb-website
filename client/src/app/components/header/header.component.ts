import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {finalize} from 'rxjs/operators';

import {AccountService} from '@services/account.service';
import {AlertService} from '@services/alert.service';
import {Account} from '@models/account.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  public navbarCollapsed = true;
  public account: Account;
  public loading = true;

  constructor(private accountService: AccountService, private alertService: AlertService, private router: Router) {

  }

  public ngOnInit(): void {
    this.accountService.getAccount().subscribe((account) => {
      this.account = account;
      this.loading = false;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public logout(): void {
    this.accountService.logout().pipe(
      finalize(() => {
        this.account = null;
        this.router.navigate(['/']);
      })
    ).subscribe(null, null);
  }
}
