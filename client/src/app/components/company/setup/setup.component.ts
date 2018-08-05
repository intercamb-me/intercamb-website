import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ColorSelected, PaletteVariant} from 'app/components/custom/material-palette-picker/material-palette-picker.component';

import {AccountService} from 'app/services/account.service';
import {CompanyService} from 'app/services/company.service';
import {AlertService} from 'app/services/alert.service';
import {Constants} from 'app/utils/constants';
import {Company} from 'app/models/company.model';
import {Institution} from 'app/models/institution.model';

@Component({
  selector: 'app-setup-company',
  templateUrl: './setup.component.html',
})
export class SetupCompanyComponent implements OnInit {

  public name: string;
  public contactEmail: string;
  public contactPhone: string;
  public website: string;
  public company: Company;
  public step = 0;
  public loading = true;
  public selectedPaletteVariant: PaletteVariant;
  public selectedTextColor: string;
  public allInstitutions: Institution[];
  public selectedInstitutions: Institution[] = [];
  public selectedInstitution: Institution;
  public phonePattern = Constants.PHONE_PATTERN;
  public phoneMask = Constants.PHONE_MASK;

  constructor(private accountService: AccountService, private companyService: CompanyService, private alertService: AlertService, private router: Router) {

  }

  public ngOnInit(): void {
    this.accountService.getAccount().subscribe((account) => {
      if (!account) {
        this.router.navigate(['/signin']);
        return;
      }
      if (account.company) {
        this.router.navigate(['/company']);
        return;
      }
      this.companyService.listAllInstitutions().subscribe((allInstitutions) => {
        this.allInstitutions = allInstitutions;
        this.loading = false;
      }, (err) => {
        this.alertService.apiError(null, err);
      });
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public trackByInstitution(_index: number, institution: Institution): string {
    return institution.id;
  }

  public compareInstitutions(institution: Institution, otherInstitution: Institution): boolean {
    return institution && otherInstitution && institution.id === otherInstitution.id;
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
    const data = {
      name: this.name,
      contact_email: this.contactEmail,
      contact_phone: this.contactPhone,
      website: this.website,
    };
    this.companyService.createCompany(data).subscribe((company) => {
      this.company = company;
      this.step = this.step + 1;
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível cadastrar a empresa, por favor tente novamente em alguns instantes!');
    });
  }

  public addInstitution(): void {
    if (this.selectedInstitution) {
      const index = this.selectedInstitutions.findIndex((currentInstitution) => {
        return currentInstitution.id === this.selectedInstitution.id;
      });
      if (index < 0) {
        this.selectedInstitutions.push(this.selectedInstitution);
      }
      this.selectedInstitution = null;
    }
  }

  public removeInstitution(institution: Institution): void {
    const index = this.selectedInstitutions.findIndex((currentInstitution) => {
      return currentInstitution.id === institution.id;
    });
    if (index >= 0) {
      this.selectedInstitutions.splice(index, 1);
    }
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

  public updateCompanyColors(): void {
    const data = {
      primary_color: this.selectedPaletteVariant.color,
      text_color: this.selectedTextColor,
    };
    this.companyService.updateCompany(data).subscribe((company) => {
      this.company = company;
      this.step = this.step + 1;
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível atualizar as configurações, por favor tente novamente em alguns instantes!');
    });
  }

  public updateCompanyInfo(): void {
    const data = {
      institutions: this.selectedInstitutions.map((institution) => {
        return institution.id;
      }),
    };
    this.companyService.updateCompany(data).subscribe((company) => {
      this.company = company;
      this.router.navigate(['/company']);
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }
}
