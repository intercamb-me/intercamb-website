import {Component, OnInit} from '@angular/core';

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

  constructor(private companyService: CompanyService, private alertService: AlertService) {

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
}
