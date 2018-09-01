import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {ClientService} from '@services/client.service';
import {AlertService} from '@services/alert.service';
import {Client} from '@models/client.model';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit.component.html',
})
export class EditClientComponent implements OnInit {

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
