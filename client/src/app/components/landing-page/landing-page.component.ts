import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AccountService} from '@services/account.service';
import {AlertService} from '@services/alert.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent implements OnInit {

  constructor(private accountService: AccountService, private alertService: AlertService, private router: Router) {

  }

  public ngOnInit(): void {
    this.accountService.getAccount().subscribe((account) => {
      if (account) {
        if (account.company) {
          this.router.navigate(['/company']);
        } else {
          this.router.navigate(['/company/setup']);
        }
      }
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }
}
