import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {NgxMasonryOptions} from 'ngx-masonry';

import {CreateClientFormComponent} from 'app/components/company/clients/create-form/create-client-form.component';

import {CompanyService} from 'app/services/company.service';
import {AlertService} from 'app/services/alert.service';
import {Client} from 'app/models/client.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {

  public clients: Client[];
  public loading = true;

  public masonryOptions: NgxMasonryOptions = {
    itemSelector: '.col-6',
    horizontalOrder: true,
    transitionDuration: '0',
  };

  constructor(private companyService: CompanyService, private alertService: AlertService, private ngbModal: NgbModal) {

  }

  public ngOnInit(): void {
    this.companyService.listClients().subscribe((clients) => {
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
}
