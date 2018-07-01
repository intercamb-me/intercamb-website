import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap/alert/alert.module';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {NgbDatepickerModule, NgbDateParserFormatter, NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import {NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap/timepicker/timepicker.module';
import {NgxMaskModule} from 'ngx-mask';
import {NgxMasonryModule} from 'ngx-masonry';

import {AppRoutes} from 'app/app.routes';
import {AppComponent} from 'app/app.component';

import {AlertsComponent} from 'app/components/alerts/alerts.component';
import {NotFoundComponent} from 'app/components/not-found/not-found.component';
import {SignUpComponent} from 'app/components/signup/signup.component';
import {SignInComponent} from 'app/components/signin/signin.component';
import {CreateCompanyComponent} from 'app/components/create-company/create-company.component';
import {CompanyComponent} from 'app/components/company/company.component';
import {ClientsComponent} from 'app/components/company/clients/clients.component';
import {ClientComponent} from 'app/components/company/client/client.component';
import {SaveClientComponent} from 'app/components/company/client/save/save-client.component';
import {CreateClientComponent} from 'app/components/company/client/create/create-client.component';
import {UpdateClientComponent} from 'app/components/company/client/update/update-client.component';
import {ChangeTaskStatusComponent} from 'app/components/company/task/change-status/change-task-status.component';
import {SchedulingComponent} from 'app/components/company/scheduling/scheduling.component';
import {ReportsComponent} from 'app/components/company/reports/reports.component';
import {SettingsComponent} from 'app/components/company/settings/settings.component';

// Services
import {CompanyService} from 'app/services/company.service';
import {AccountService} from 'app/services/account.service';
import {ClientService} from 'app/services/client.service';
import {AlertService} from 'app/services/alert.service';
import {EventService} from 'app/services/event.service';

// Other
import {BrazilianNgbDateParserFormatter, BrazilianNgbDatepickerI18n} from 'app/utils/angular.utils';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes.listRoutes()),
    FormsModule,
    NgbAlertModule.forRoot(),
    NgbModalModule.forRoot(),
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgxMasonryModule,
  ],
  declarations: [
    AppComponent,
    AlertsComponent,
    NotFoundComponent,
    SignUpComponent,
    SignInComponent,
    CreateCompanyComponent,
    CompanyComponent,
    ClientsComponent,
    ClientComponent,
    SaveClientComponent,
    CreateClientComponent,
    UpdateClientComponent,
    ChangeTaskStatusComponent,
    SchedulingComponent,
    ReportsComponent,
    SettingsComponent,
  ],
  entryComponents: [
    ChangeTaskStatusComponent,
  ],
  providers: [
    CompanyService,
    AccountService,
    ClientService,
    AlertService,
    EventService,
    {provide: NgbDatepickerI18n, useClass: BrazilianNgbDatepickerI18n},
    {provide: NgbDateParserFormatter, useClass: BrazilianNgbDateParserFormatter},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
