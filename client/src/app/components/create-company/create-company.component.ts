import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AccountService} from 'app/services/account.service';
import {CompanyService} from 'app/services/company.service';
import {AlertService} from 'app/services/alert.service';
import {Company} from 'app/models/company.model';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
})
export class CreateCompanyComponent implements OnInit {

  public name: string;
  public company: Company;

  public loading = true;

  constructor(private accountService: AccountService, private companyService: CompanyService, private alertService: AlertService, private router: Router) {

  }

  public ngOnInit(): void {
    this.accountService.getAccount().subscribe((account) => {
      if (!account) {
        this.router.navigate(['/signup']);
        return;
      }
      if (account.company) {
        this.router.navigate(['/company']);
        return;
      }
      this.loading = false;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public create(): void {
    this.companyService.createCompany(this.name).subscribe((company) => {
      this.company = company;
      this.router.navigate(['/company']);
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }
}
