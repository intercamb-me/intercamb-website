import {Routes} from '@angular/router';

import {LandingPageComponent} from '@components/landing-page/landing-page.component';
import {PlansComponent} from '@components/plans/plans.component';
import {TermsComponent} from '@components/terms/terms.component';
import {SignUpComponent} from '@components/signup/signup.component';
import {SignInComponent} from '@components/signin/signin.component';
import {SetupCompanyComponent} from '@components/company/setup/setup.component';
import {CompanyComponent} from '@components/company/company.component';
import {HomeComponent} from '@components/company/home/home.component';
import {ClientsComponent} from '@components/company/clients/clients.component';
import {ClientComponent} from '@components/company/client/client.component';
import {ClientFormComponent} from '@components/company/client/form/form.component';
import {CreateClientComponent} from '@components/company/client/create/create.component';
import {EditClientComponent} from '@components/company/client/edit/edit.component';
import {CalendarComponent} from '@components/company/calendar/calendar.component';
import {ReportsComponent} from '@components/company/reports/reports.component';
import {CompanySettingsComponent} from '@components/company/settings/settings.component';
import {AccountSettingsComponent} from '@components/account/settings/settings.component';
import {NotFoundComponent} from '@components/not-found/not-found.component';

export class AppRoutes {

  public static listRoutes(): Routes {
    return [
      {path: '', component: LandingPageComponent},
      {path: 'plans', component: PlansComponent},
      {path: 'terms', component: TermsComponent},
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
      {path: 'account/settings', component: CompanyComponent, children: [
        {path: '', component: AccountSettingsComponent},
      ]},
      {path: 'clients/form/:token', component: ClientFormComponent},
      {path: '**', component: NotFoundComponent},
    ];
  }
}
