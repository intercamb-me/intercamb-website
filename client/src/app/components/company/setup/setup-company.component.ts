import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ColorSelected, PaletteVariant} from 'app/components/custom/material-palette-picker/material-palette-picker.component';

import {AccountService} from 'app/services/account.service';
import {CompanyService} from 'app/services/company.service';
import {AlertService} from 'app/services/alert.service';
import {Company} from 'app/models/company.model';

@Component({
  selector: 'app-setup-company',
  templateUrl: './setup-company.component.html',
})
export class SetupCompanyComponent implements OnInit {

  public name: string;
  public company: Company;
  public step = 0;
  public loading = true;

  public selectedPaletteVariant: PaletteVariant;
  public selectedTextColor: string;

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

  public onColorSelected(colorSelected: ColorSelected): void {
    const {variant} = colorSelected;
    this.selectedPaletteVariant = variant;
    this.selectedTextColor = variant.textColor;
  }

  public selectTextColor(color: string): void {
    this.selectedTextColor = color;
  }

  public createCompany(): void {
    this.companyService.createCompany(this.name).subscribe((company) => {
      this.company = company;
      this.step = this.step + 1;
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível cadastrar a empresa, por favor tente novamente em alguns instantes!');
    });
  }

  public updateCompany(): void {
    const data = {
      primary_color: this.selectedPaletteVariant.color,
      text_color: this.selectedPaletteVariant.textColor,
    };
    this.companyService.updateCompany(data).subscribe((company) => {
      this.company = company;
      this.router.navigate(['/company']);
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível atualizar as configurações, por favor tente novamente em alguns instantes!');
    });
  }

  public updateCompanyLogo(event: any): void {
    const file = event.target.files[0];
    this.companyService.updateCompanyLogo(file).subscribe((company) => {
      this.company = company;
      this.alertService.success('Logo atualizado com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível atualizar o logo, por favor tente novamente em alguns instantes!');
    });
  }
}
