import {NgModule, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import pt from '@angular/common/locales/pt';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap/alert/alert.module';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown.module';
import {NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap/popover/popover.module';
import {NgbDatepickerModule, NgbDateParserFormatter, NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import {NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap/timepicker/timepicker.module';
import {NgxMaskModule} from 'ngx-mask';
import {NgxMasonryModule} from 'ngx-masonry';
import {ClipboardModule} from 'ngx-clipboard';
import {CalendarModule} from 'angular-calendar';

import {AppRoutes} from 'app/app.routes';
import {AppComponent} from 'app/app.component';

import {AlertsComponent} from 'app/components/alerts/alerts.component';
import {NotFoundComponent} from 'app/components/not-found/not-found.component';
import {SignUpComponent} from 'app/components/signup/signup.component';
import {SignInComponent} from 'app/components/signin/signin.component';
import {CreateCompanyComponent} from 'app/components/create-company/create-company.component';
import {CompanyComponent} from 'app/components/company/company.component';
import {ClientsComponent} from 'app/components/company/clients/clients.component';
import {CreateClientFormComponent} from 'app/components/company/clients/create-form/create-client-form.component';
import {ClientComponent} from 'app/components/company/client/client.component';
import {SaveClientComponent} from 'app/components/company/client/save/save-client.component';
import {CreateClientComponent} from 'app/components/company/client/create/create-client.component';
import {UpdateClientComponent} from 'app/components/company/client/update/update-client.component';
import {TaskComponent} from 'app/components/company/task/task.component';
import {ChangeTaskStatusComponent} from 'app/components/company/task/change-status/change-task-status.component';
import {SetTaskScheduleDateComponent} from 'app/components/company/task/set-schedule-date/set-task-schedule-date.component';
import {SchedulingComponent} from 'app/components/company/scheduling/scheduling.component';
import {ReportsComponent} from 'app/components/company/reports/reports.component';
import {SettingsComponent} from 'app/components/company/settings/settings.component';

// Services
import {CompanyService} from 'app/services/company.service';
import {AccountService} from 'app/services/account.service';
import {ClientService} from 'app/services/client.service';
import {TaskService} from 'app/services/task.service';
import {TokenService} from 'app/services/token.service';
import {AlertService} from 'app/services/alert.service';
import {EventService} from 'app/services/event.service';

// Other
import {CapitalizeFirstPipe, MapValuesPipe, SizePipe, BrazilianNgbDateParserFormatter, BrazilianNgbDatepickerI18n} from 'app/utils/angular.utils';

registerLocaleData(pt);

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes.listRoutes()),
    NgbAlertModule.forRoot(),
    NgbModalModule.forRoot(),
    NgbDropdownModule.forRoot(),
    NgbPopoverModule.forRoot(),
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgxMasonryModule,
    ClipboardModule,
    CalendarModule.forRoot(),
  ],
  declarations: [
    CapitalizeFirstPipe,
    MapValuesPipe,
    SizePipe,
    AppComponent,
    AlertsComponent,
    NotFoundComponent,
    SignUpComponent,
    SignInComponent,
    CreateCompanyComponent,
    CompanyComponent,
    ClientsComponent,
    CreateClientFormComponent,
    ClientComponent,
    SaveClientComponent,
    CreateClientComponent,
    UpdateClientComponent,
    TaskComponent,
    ChangeTaskStatusComponent,
    SetTaskScheduleDateComponent,
    SchedulingComponent,
    ReportsComponent,
    SettingsComponent,
  ],
  entryComponents: [
    CreateClientFormComponent,
    TaskComponent,
    ChangeTaskStatusComponent,
    SetTaskScheduleDateComponent,
  ],
  providers: [
    CompanyService,
    AccountService,
    ClientService,
    TaskService,
    TokenService,
    AlertService,
    EventService,
    {provide: LOCALE_ID, useValue: 'pt'},
    {provide: NgbDatepickerI18n, useClass: BrazilianNgbDatepickerI18n},
    {provide: NgbDateParserFormatter, useClass: BrazilianNgbDateParserFormatter},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
