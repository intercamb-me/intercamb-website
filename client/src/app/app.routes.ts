import {Routes} from '@angular/router';

import {NotFoundComponent} from 'app/components/not-found/not-found.component';
import {SignUpComponent} from 'app/components/signup/signup.component';
import {SignInComponent} from 'app/components/signin/signin.component';
import {RegisterCompanyComponent} from 'app/components/register-company/register-company.component';
import {CompanyComponent} from 'app/components/company/company.component';
import {ClientsComponent} from 'app/components/company/clients/clients.component';
import {ClientComponent} from 'app/components/company/client/client.component';
import {RegisterClientComponent} from 'app/components/company/register-client/register-client.component';
import {SchedulingComponent} from 'app/components/company/scheduling/scheduling.component';
import {SettingsComponent} from 'app/components/company/settings/settings.component';

export class AppRoutes {

  public static listRoutes(): Routes {
    return [
      {path: 'signup', component: SignUpComponent},
      {path: 'signin', component: SignInComponent},
      {path: 'companies/register', component: RegisterCompanyComponent},
      {path: 'company', component: CompanyComponent, children: [
        {path: 'clients', component: ClientsComponent},
        {path: 'clients/register', component: RegisterClientComponent},
        {path: 'clients/:client', component: ClientComponent},
        {path: 'scheduling', component: SchedulingComponent},
        {path: 'settings', component: SettingsComponent},
      ]},
      {path: '**', component: NotFoundComponent},
    ];
  }
}
