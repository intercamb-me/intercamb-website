import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ClientService} from 'app/services/client.service';
import {AlertService} from 'app/services/alert.service';
import {Client} from 'app/models/client.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
})
export class ClientComponent implements OnInit {

  public client: Client;
  public loading = true;
  public clientInfoIndex = 0;

  constructor(private clientService: ClientService, private alertService: AlertService, private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit(): void {
    const clientId = this.activatedRoute.snapshot.paramMap.get('client');
    this.clientService.getClient(clientId).subscribe((client) => {
      this.client = client;
      this.loading = false;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public nextClientInfo(): void {
    this.clientInfoIndex++;
  }

  public previousClientInfo(): void {
    this.clientInfoIndex--
  }
}
