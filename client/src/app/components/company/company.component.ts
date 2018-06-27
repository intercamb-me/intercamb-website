import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

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
    this.accountService.getCurrentAccount().subscribe((account) => {
      if (!account) {
        this.router.navigate(['/signin']);
        return;
      }
      if (!account.company) {
        this.router.navigate(['/companies', 'register']);
        return;
      }
      this.account = account;
      this.companyService.getCurrentCompany().subscribe((company) => {
        this.company = company;
        this.loading = false;
      }, (err) => {
        this.alertService.apiError(null, err);
      });
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }
}
