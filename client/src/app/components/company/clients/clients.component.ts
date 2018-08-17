import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxMasonryOptions} from 'ngx-masonry';

import {CreateClientFormComponent} from 'app/components/company/clients/create-form/create-form.component';

import {CompanyService} from 'app/services/company.service';
import {AlertService} from 'app/services/alert.service';
import {Client} from 'app/models/client.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {

  private static readonly CLIENT_FIELDS = 'forename surname email phone photo_url';

  public clients: Client[];
  public search: string = null;
  public loading = true;

  public masonryOptions: NgxMasonryOptions = {
    itemSelector: '.col-6',
    horizontalOrder: true,
    transitionDuration: '0',
  };

  constructor(private companyService: CompanyService, private alertService: AlertService, private ngbModal: NgbModal) {

  }

  public ngOnInit(): void {
    this.companyService.listClients(null, {select: ClientsComponent.CLIENT_FIELDS}).subscribe((clients) => {
      this.clients = clients;
      this.loading = false;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public trackByClient(_index: number, client: Client): string {
    return client.id;
  }

  public openSendForm(): void {
    this.ngbModal.open(CreateClientFormComponent);
  }

  public searchClients(): void {
    this.companyService.searchClients(this.search, {select: ClientsComponent.CLIENT_FIELDS}).subscribe((clients) => {
      this.clients = clients;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }
}
