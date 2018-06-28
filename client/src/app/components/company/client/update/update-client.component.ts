import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {ClientService} from 'app/services/client.service';
import {AlertService} from 'app/services/alert.service';
import {Client} from 'app/models/client.model';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
})
export class UpdateClientComponent implements OnInit {

  public client: Client;
  public loading = true;

  constructor(private clientService: ClientService, private alertService: AlertService, private router: Router, private activatedRoute: ActivatedRoute) {

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

  public onUpdated(client: Client): void {
    this.router.navigate(['/company', 'clients', client.id]);
  }
}
