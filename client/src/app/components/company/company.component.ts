import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {finalize} from 'rxjs/operators';

import {AccountService} from '@services/account.service';
import {CompanyService} from '@services/company.service';
import {AlertService} from '@services/alert.service';
import {EventService} from '@services/event.service';
import {Account} from '@models/account.model';
import {Company} from '@models/company.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
})
export class CompanyComponent implements OnInit {

  public account: Account;
  public company: Company;
  public loading = true;

  constructor(private accountService: AccountService, private companyService: CompanyService, private alertService: AlertService, private eventService: EventService, private router: Router) {

  }

  public ngOnInit(): void {
    this.accountService.getAccount().subscribe((account) => {
      if (!account) {
        this.router.navigate(['/signin']);
        return;
      }
      if (!account.company) {
        this.router.navigate(['/company', 'setup']);
        return;
      }
      this.account = account;
      this.companyService.getCompany({select: 'name logo_url primary_color text_color'}).subscribe((company) => {
        this.company = company;
        this.subscribeEvents();
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
        this.router.navigate(['/signin']);
      })
    ).subscribe(null, null);
  }

  private subscribeEvents(): void {
    this.eventService.subscribe(EventService.EVENT_COMPANY_CHANGED, (event) => {
      this.company = event.value;
    });
    this.eventService.subscribe(EventService.EVENT_ACCOUNT_CHANGED, (event) => {
      this.account = event.value;
    });
  }
}
