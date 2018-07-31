// Angular
import {NgModule, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {registerLocaleData} from '@angular/common';
import pt from '@angular/common/locales/pt';

// Bootstrap
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap/alert/alert.module';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown.module';
import {NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap/popover/popover.module';
import {NgbDatepickerModule, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import {NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap/timepicker/timepicker.module';

// Fontawesome
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {faBarcode} from '@fortawesome/free-solid-svg-icons/faBarcode';
import {faBriefcase} from '@fortawesome/free-solid-svg-icons/faBriefcase';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons/faCalendarAlt';
import {faChartLine} from '@fortawesome/free-solid-svg-icons/faChartLine';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faCheckDouble} from '@fortawesome/free-solid-svg-icons/faCheckDouble';
import {faClock} from '@fortawesome/free-regular-svg-icons/faClock';
import {faCog} from '@fortawesome/free-solid-svg-icons/faCog';
import {faComment} from '@fortawesome/free-regular-svg-icons/faComment';
import {faCreditCard} from '@fortawesome/free-solid-svg-icons/faCreditCard';
import {faDollarSign} from '@fortawesome/free-solid-svg-icons/faDollarSign';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons/faEnvelopeOpen';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faKey} from '@fortawesome/free-solid-svg-icons/faKey';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons/faPaperclip';
import {faPen} from '@fortawesome/free-solid-svg-icons/faPen';
import {faTasks} from '@fortawesome/free-solid-svg-icons/faTasks';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faUsers} from '@fortawesome/free-solid-svg-icons/faUsers';

// Other 3rd libraries
import {NgxMaskModule} from 'ngx-mask';
import {NgxMasonryModule} from 'ngx-masonry';
import {ClipboardModule} from 'ngx-clipboard';
import {CalendarModule} from 'angular-calendar';

// Routes
import {AppRoutes} from 'app/app.routes';

// Components
import {AppComponent} from 'app/app.component';
import {AlertsComponent} from 'app/components/alerts/alerts.component';
import {NotFoundComponent} from 'app/components/not-found/not-found.component';
import {SignUpComponent} from 'app/components/signup/signup.component';
import {SignInComponent} from 'app/components/signin/signin.component';
import {SetupCompanyComponent} from 'app/components/company/setup/setup-company.component';
import {CompanyComponent} from 'app/components/company/company.component';
import {HomeComponent} from 'app/components/company/home/home.component';
import {ClientsComponent} from 'app/components/company/clients/clients.component';
import {ClientComponent} from 'app/components/company/client/client.component';
import {ClientFormComponent} from 'app/components/company/client/form/form.component';
import {SaveClientComponent} from 'app/components/company/client/save/save.component';
import {CreateClientComponent} from 'app/components/company/client/create/create.component';
import {EditClientComponent} from 'app/components/company/client/edit/edit.component';
import {CalendarComponent} from 'app/components/company/calendar/calendar.component';
import {ReportsComponent} from 'app/components/company/reports/reports.component';
import {CompanySettingsComponent} from 'app/components/company/settings/settings.component';
import {AccountSettingsComponent} from 'app/components/account/settings/settings.component';

// Shared Components
import {MaterialPalettePickerComponent} from 'app/components/custom/material-palette-picker/material-palette-picker.component';

// Modals
import {CreateClientFormComponent} from 'app/components/company/clients/create-form/create-form.component';
import {TaskComponent} from 'app/components/company/task/task.component';
import {ChangeTaskStatusComponent} from 'app/components/company/task/change-status/change-status.component';
import {SetTaskScheduleDateComponent} from 'app/components/company/task/set-schedule-date/set-schedule-date.component';
import {SearchAddressComponent} from 'app/components/company/client/search-address/search-address.component';
import {SaveInstitutionsComponent} from 'app/components/company/settings/institutions/save/save.component';
import {SavePlanComponent} from 'app/components/company/settings/plan/save/save.component';
import {DeletePlanComponent} from 'app/components/company/settings/plan/delete/delete.component';
import {AssociatePlanComponent} from 'app/components/company/client/associate-plan/associate-plan.component';
import {CreatePaymentOrderComponent} from 'app/components/company/client/payment-order/create/create.component';
import {EditPaymentOrderComponent} from 'app/components/company/client/payment-order/edit/edit.component';
import {DeletePaymentOrderComponent} from 'app/components/company/client/payment-order/delete/delete.component';
import {ChangePaymentOrderStatusComponent} from 'app/components/company/client/payment-order/change-status/change-status.component';

// Services
import {CompanyService} from 'app/services/company.service';
import {AccountService} from 'app/services/account.service';
import {ClientService} from 'app/services/client.service';
import {TaskService} from 'app/services/task.service';
import {TokenService} from 'app/services/token.service';
import {PlanService} from 'app/services/plan.service';
import {PaymentService} from 'app/services/payment.service';
import {AlertService} from 'app/services/alert.service';
import {EventService} from 'app/services/event.service';

// Utilities
import {
  CapitalizeFirstPipe,
  MapValuesPipe,
  ValuesPipe,
  SizePipe,
  HyphensIfEmptyPipe,
  CurrencySymbolPipe,
  BrazilianNgbDateParserFormatter,
} from 'app/utils/angular.utils';

registerLocaleData(pt);

library.add(faArrowLeft);
library.add(faBarcode);
library.add(faBriefcase);
library.add(faCalendarAlt);
library.add(faChartLine);
library.add(faCheck);
library.add(faCheckDouble);
library.add(faClock);
library.add(faCog);
library.add(faComment);
library.add(faCreditCard);
library.add(faDollarSign);
library.add(faEllipsisV);
library.add(faEnvelope);
library.add(faEnvelopeOpen);
library.add(faHome);
library.add(faKey);
library.add(faPaperclip);
library.add(faPen);
library.add(faTasks);
library.add(faTasks);
library.add(faTimes);
library.add(faTrash);
library.add(faUser);
library.add(faUsers);

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
    FontAwesomeModule,
    NgxMaskModule.forRoot(),
    NgxMasonryModule,
    ClipboardModule,
    CalendarModule.forRoot(),
  ],
  declarations: [
    // Pipes
    CapitalizeFirstPipe,
    MapValuesPipe,
    ValuesPipe,
    SizePipe,
    HyphensIfEmptyPipe,
    CurrencySymbolPipe,
    // Components
    AppComponent,
    AlertsComponent,
    NotFoundComponent,
    SignUpComponent,
    SignInComponent,
    SetupCompanyComponent,
    CompanyComponent,
    HomeComponent,
    ClientsComponent,
    CreateClientFormComponent,
    ClientComponent,
    SaveClientComponent,
    CreateClientComponent,
    EditClientComponent,
    CalendarComponent,
    ReportsComponent,
    CompanySettingsComponent,
    AccountSettingsComponent,
    // Shared Components
    MaterialPalettePickerComponent,
    // Modals
    ClientFormComponent,
    TaskComponent,
    ChangeTaskStatusComponent,
    SetTaskScheduleDateComponent,
    SearchAddressComponent,
    SaveInstitutionsComponent,
    SavePlanComponent,
    DeletePlanComponent,
    AssociatePlanComponent,
    CreatePaymentOrderComponent,
    EditPaymentOrderComponent,
    DeletePaymentOrderComponent,
    ChangePaymentOrderStatusComponent,
  ],
  entryComponents: [
    CreateClientFormComponent,
    TaskComponent,
    ChangeTaskStatusComponent,
    SetTaskScheduleDateComponent,
    SearchAddressComponent,
    SaveInstitutionsComponent,
    SavePlanComponent,
    DeletePlanComponent,
    AssociatePlanComponent,
    CreatePaymentOrderComponent,
    EditPaymentOrderComponent,
    DeletePaymentOrderComponent,
    ChangePaymentOrderStatusComponent,
  ],
  providers: [
    CompanyService,
    AccountService,
    ClientService,
    TaskService,
    TokenService,
    PlanService,
    PaymentService,
    AlertService,
    EventService,
    {provide: LOCALE_ID, useValue: 'pt'},
    {provide: NgbDateParserFormatter, useClass: BrazilianNgbDateParserFormatter},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
