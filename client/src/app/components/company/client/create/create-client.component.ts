import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Client} from 'app/models/client.model';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
})
export class CreateClientComponent {

  public client = new Client({
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
  });

  constructor(private router: Router) {

  }

  public onCreated(client: Client): void {
    this.router.navigate(['/company', 'clients', client.id]);
  }
}
