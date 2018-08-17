import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {mergeMap} from 'rxjs/operators';

import {CompanyService} from 'app/services/company.service';
import {AlertService} from 'app/services/alert.service';
import {Institution} from 'app/models/institution.model';

@Component({
  selector: 'app-save-institutions',
  templateUrl: './save-institutions.component.html',
})
export class SaveInstitutionsComponent implements OnInit {

  public allInstitutions: Institution[];
  public selectedInstitutions: Institution[];
  public selectedInstitution: Institution;
  public loading = true;
  public saving = false;

  constructor(private companyService: CompanyService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public ngOnInit(): void {
    this.companyService.getCompany({populate: 'institutions'}).pipe(
      mergeMap((company) => {
        this.selectedInstitutions = company.institutions;
        return this.companyService.listAllInstitutions();
      })
    ).subscribe((allInstitutions) => {
      this.allInstitutions = allInstitutions;
      this.loading = false;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public trackByInstitution(_index: number, institution: Institution): string {
    return institution.id;
  }

  public compareInstitutions(institution: Institution, otherInstitution: Institution): boolean {
    return institution && otherInstitution && institution.id === otherInstitution.id;
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

  public saveInstitutions(): void {
    this.saving = true;
    const data = {
      institutions: this.selectedInstitutions.map((institution) => {
        return institution.id;
      }),
    };
    this.companyService.updateCompany(data).subscribe(() => {
      this.ngbActiveModal.close(this.selectedInstitutions);
      this.alertService.success('Instituições atualizadas com sucesso!');
    }, (err) => {
      this.saving = false;
      this.alertService.apiError(null, err, 'Não foi possível atualizar as instituições, por favor tente novamente mais tarde!');
    });
  }
}
