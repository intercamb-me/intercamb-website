import {Routes} from '@angular/router';

import {NotFoundComponent} from 'app/components/not-found/not-found.component';
import {SignUpComponent} from 'app/components/signup/signup.component';
import {SignInComponent} from 'app/components/signin/signin.component';
import {SetupCompanyComponent} from 'app/components/company/setup/setup-company.component';
import {CompanyComponent} from 'app/components/company/company.component';
import {HomeComponent} from 'app/components/company/home/home.component';
import {ClientsComponent} from 'app/components/company/clients/clients.component';
import {ClientComponent} from 'app/components/company/client/client.component';
import {ClientFormComponent} from 'app/components/company/client/form/client-form.component';
import {CreateClientComponent} from 'app/components/company/client/create/create-client.component';
import {EditClientComponent} from 'app/components/company/client/edit/edit-client.component';
import {CalendarComponent} from 'app/components/company/calendar/calendar.component';
import {ReportsComponent} from 'app/components/company/reports/reports.component';
import {CompanySettingsComponent} from 'app/components/company/settings/company-settings.component';

export class AppRoutes {

  public static listRoutes(): Routes {
    return [
      {path: 'signup', component: SignUpComponent},
      {path: 'signin', component: SignInComponent},
      {path: 'company/setup', component: SetupCompanyComponent},
      {path: 'company', component: CompanyComponent, children: [
        {path: '', component: HomeComponent},
        {path: 'clients', component: ClientsComponent},
        {path: 'clients/new', component: CreateClientComponent},
        {path: 'clients/:client/edit', component: EditClientComponent},
        {path: 'clients/:client', component: ClientComponent},
        {path: 'calendar', component: CalendarComponent},
        {path: 'reports', component: ReportsComponent},
        {path: 'settings', component: CompanySettingsComponent},
      ]},
      {path: 'clients/form/:token', component: ClientFormComponent},
      {path: '**', component: NotFoundComponent},
    ];
  }
}
