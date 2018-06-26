import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap/alert/alert.module';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown.module';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap/collapse/collapse.module';

import {AppRoutes} from 'app/app.routes';
import {AppComponent} from 'app/app.component';

import {AlertsComponent} from 'app/components/alerts/alerts.component';
import {NotFoundComponent} from 'app/components/not-found/not-found.component';
import {SignUpComponent} from 'app/components/signup/signup.component';
import {SignInComponent} from 'app/components/signin/signin.component';
import {RegisterCompanyComponent} from 'app/components/register-company/register-company.component';
import {CompanyComponent} from 'app/components/company/company.component';
import {ClientsComponent} from 'app/components/company/clients/clients.component';
import {RegisterClientComponent} from 'app/components/company/register-client/register-client.component';
import {SchedulingComponent} from 'app/components/company/scheduling/scheduling.component';
import {SettingsComponent} from 'app/components/company/settings/settings.component';

// Services
import {CompanyService} from 'app/services/company.service';
import {AccountService} from 'app/services/account.service';
import {ClientService} from 'app/services/client.service';
import {AlertService} from 'app/services/alert.service';
import {EventService} from 'app/services/event.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes.listRoutes()),
    FormsModule,
    NgbAlertModule.forRoot(),
    NgbModalModule.forRoot(),
    NgbDropdownModule.forRoot(),
    NgbCollapseModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    AlertsComponent,
    NotFoundComponent,
    SignUpComponent,
    SignInComponent,
    RegisterCompanyComponent,
    CompanyComponent,
    ClientsComponent,
    RegisterClientComponent,
    SchedulingComponent,
    SettingsComponent,
  ],
  entryComponents: [],
  providers: [
    CompanyService,
    AccountService,
    ClientService,
    AlertService,
    EventService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
