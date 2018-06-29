import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Client} from 'app/models/client.model';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
})
export class CreateClientComponent {

  public client = new Client({});

  constructor(private router: Router) {

  }

  public onCreated(client: Client): void {
    this.router.navigate(['/company', 'clients', client.id]);
  }
}
