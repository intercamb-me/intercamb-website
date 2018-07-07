import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {finalize} from 'rxjs/operators';

import {AccountService} from 'app/services/account.service';
import {CompanyService} from 'app/services/company.service';
import {AlertService} from 'app/services/alert.service';
import {Account} from 'app/models/account.model';
import {Company} from 'app/models/company.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
})
export class CompanyComponent implements OnInit {

  public account: Account;
  public company: Company;
  public loading = true;

  constructor(private accountService: AccountService, private companyService: CompanyService, private alertService: AlertService, private router: Router) {

  }

  public ngOnInit(): void {
    this.accountService.getAccount().subscribe((account) => {
      if (!account) {
        this.router.navigate(['/signin']);
        return;
      }
      if (!account.company) {
        this.router.navigate(['/companies', 'new']);
        return;
      }
      this.account = account;
      this.companyService.getCompany().subscribe((company) => {
        this.company = company;
        this.loading = false;
      }, (err) => {
        this.alertService.apiError(null, err);
      });
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
