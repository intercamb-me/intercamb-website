import {Component} from '@angular/core';

import {ClientService} from 'app/services/client.service';
import {AlertService} from 'app/services/alert.service';
import {Client} from 'app/models/client.model';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
})
export class RegisterClientComponent {

  public client: Client;
  public data: any = {
    address: {},
    personal_data: {
      place_of_birth: {},
      identity_card: {},
    },
    family_data: {
      father: {},
      mother: {},
    },
    academic_data: {
      high_school: {},
      higher_education: {},
    },
    intended_course: {},
    additional_information: {},
  };

  constructor(private clientService: ClientService, private alertService: AlertService) {

  }

  public register(): void {
    this.clientService.createClient(this.data).subscribe((client) => {
      this.client = client;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }
}
