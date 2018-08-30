// Angular
import {NgModule, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {registerLocaleData} from '@angular/common';
import pt from '@angular/common/locales/pt';

// Bootstrap
import {
  NgbAlertModule,
  NgbDatepickerModule,
  NgbDateParserFormatter,
  NgbDropdownModule,
  NgbModalModule,
  NgbPopoverModule,
  NgbTimepickerModule
} from '@ng-bootstrap/ng-bootstrap';

// Fontawesome
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {faBarcode} from '@fortawesome/free-solid-svg-icons/faBarcode';
import {faBirthdayCake} from '@fortawesome/free-solid-svg-icons/faBirthdayCake';
import {faBriefcase} from '@fortawesome/free-solid-svg-icons/faBriefcase';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons/faCalendarAlt';
import {faChartLine} from '@fortawesome/free-solid-svg-icons/faChartLine';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faCheckDouble} from '@fortawesome/free-solid-svg-icons/faCheckDouble';
import {faCheckSquare} from '@fortawesome/free-regular-svg-icons/faCheckSquare';
import {faClock} from '@fortawesome/free-solid-svg-icons/faClock';
import {faCog} from '@fortawesome/free-solid-svg-icons/faCog';
import {faComment} from '@fortawesome/free-solid-svg-icons/faComment';
import {faCreditCard} from '@fortawesome/free-solid-svg-icons/faCreditCard';
import {faDollarSign} from '@fortawesome/free-solid-svg-icons/faDollarSign';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons/faEnvelopeOpen';
import {faGraduationCap} from '@fortawesome/free-solid-svg-icons/faGraduationCap';
import {faHashtag} from '@fortawesome/free-solid-svg-icons/faHashtag';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faKey} from '@fortawesome/free-solid-svg-icons/faKey';
import {faList} from '@fortawesome/free-solid-svg-icons/faList';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons/faPaperclip';
import {faPen} from '@fortawesome/free-solid-svg-icons/faPen';
import {faPhone} from '@fortawesome/free-solid-svg-icons/faPhone';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {faSchool} from '@fortawesome/free-solid-svg-icons/faSchool';
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
import {AutofocusModule} from 'angular-autofocus-fix';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';

// Routes
import {AppRoutes} from 'app/app.routes';

// Components
import {AppComponent} from 'app/app.component';
import {AlertsComponent} from 'app/components/alerts/alerts.component';
import {LandingPageComponent} from 'app/components/landing-page/landing-page.component';
import {SignUpComponent} from 'app/components/signup/signup.component';
import {SignInComponent} from 'app/components/signin/signin.component';
import {SetupCompanyComponent} from 'app/components/company/setup/setup.component';
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
import {NotFoundComponent} from 'app/components/not-found/not-found.component';

// Shared Components
import {MaterialPalettePickerComponent} from 'app/components/custom/material-palette-picker/material-palette-picker.component';
import {EditDefaultTaskComponent} from 'app/components/custom/edit-default-task/edit-default-task.component';

// Modals
import {CreateClientFormComponent} from 'app/components/company/clients/create-form/create-form.component';
import {DeleteClientComponent} from 'app/components/company/client/delete/delete.component';
import {CreateTaskComponent} from 'app/components/company/client/create-task/create-task.component';
import {TaskComponent} from 'app/components/company/task/task.component';
import {ChangeTaskStatusComponent} from 'app/components/company/task/change-status/change-status.component';
import {SetTaskScheduleDateComponent} from 'app/components/company/task/set-schedule-date/set-schedule-date.component';
import {SetTaskLocationComponent} from 'app/components/company/task/set-location/set-location.component';
import {DeleteTaskComponent} from 'app/components/company/task/delete/delete.component';
import {SearchAddressComponent} from 'app/components/company/client/search-address/search-address.component';
import {RemoveAccountComponent} from 'app/components/company/settings/remove-account/remove-account.component';
import {SaveDefaultTasksComponent} from 'app/components/company/settings/save-default-tasks/save-default-tasks.component';
import {SaveInstitutionsComponent} from 'app/components/company/settings/save-institutions/save-institutions.component';
import {SavePlanComponent} from 'app/components/company/settings/plan/save/save.component';
import {DeletePlanComponent} from 'app/components/company/settings/plan/delete/delete.component';
import {AssociatePlanComponent} from 'app/components/company/client/associate-plan/associate-plan.component';
import {CreatePaymentOrderComponent} from 'app/components/company/client/payment-order/create/create.component';
import {EditPaymentOrderComponent} from 'app/components/company/client/payment-order/edit/edit.component';
import {DeletePaymentOrderComponent} from 'app/components/company/client/payment-order/delete/delete.component';
import {ChangePaymentOrderStatusComponent} from 'app/components/company/client/payment-order/change-status/change-status.component';
import {InvitationComponent} from 'app/components/company/settings/invitation/invitation.component';

// Services
import {AccountService} from 'app/services/account.service';
import {AlertService} from 'app/services/alert.service';
import {ClientService} from 'app/services/client.service';
import {CompanyService} from 'app/services/company.service';
import {EventService} from 'app/services/event.service';
import {InvitationService} from 'app/services/invitation.service';
import {PaymentService} from 'app/services/payment.service';
import {PlanService} from 'app/services/plan.service';
import {TaskService} from 'app/services/task.service';
import {TokenService} from 'app/services/token.service';

// Directives
import {GooglePlacesDirective} from 'app/directives/google-places/google-places.directive';

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
library.add(faBirthdayCake);
library.add(faBriefcase);
library.add(faCalendarAlt);
library.add(faChartLine);
library.add(faCheck);
library.add(faCheckDouble);
library.add(faCheckSquare);
library.add(faClock);
library.add(faCog);
library.add(faComment);
library.add(faCreditCard);
library.add(faDollarSign);
library.add(faEllipsisV);
library.add(faEnvelope);
library.add(faEnvelopeOpen);
library.add(faGraduationCap);
library.add(faHashtag);
library.add(faHome);
library.add(faKey);
library.add(faList);
library.add(faMapMarkerAlt);
library.add(faPaperclip);
library.add(faPen);
library.add(faPhone);
library.add(faPlus);
library.add(faSchool);
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
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    AutofocusModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
  ],
  declarations: [
    // Pipes
    CapitalizeFirstPipe,
    MapValuesPipe,
    ValuesPipe,
    SizePipe,
    HyphensIfEmptyPipe,
    CurrencySymbolPipe,
    // Directives
    GooglePlacesDirective,
    // Components
    AppComponent,
    AlertsComponent,
    LandingPageComponent,
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
    NotFoundComponent,
    // Shared Components
    MaterialPalettePickerComponent,
    EditDefaultTaskComponent,
    // Modals
    ClientFormComponent,
    DeleteClientComponent,
    CreateTaskComponent,
    TaskComponent,
    ChangeTaskStatusComponent,
    SetTaskLocationComponent,
    SetTaskScheduleDateComponent,
    DeleteTaskComponent,
    SearchAddressComponent,
    RemoveAccountComponent,
    SaveDefaultTasksComponent,
    SaveInstitutionsComponent,
    SavePlanComponent,
    DeletePlanComponent,
    AssociatePlanComponent,
    CreatePaymentOrderComponent,
    EditPaymentOrderComponent,
    DeletePaymentOrderComponent,
    ChangePaymentOrderStatusComponent,
    InvitationComponent,
  ],
  entryComponents: [
    CreateClientFormComponent,
    DeleteClientComponent,
    CreateTaskComponent,
    TaskComponent,
    ChangeTaskStatusComponent,
    SetTaskLocationComponent,
    SetTaskScheduleDateComponent,
    DeleteTaskComponent,
    SearchAddressComponent,
    RemoveAccountComponent,
    SaveDefaultTasksComponent,
    SaveInstitutionsComponent,
    SavePlanComponent,
    DeletePlanComponent,
    AssociatePlanComponent,
    CreatePaymentOrderComponent,
    EditPaymentOrderComponent,
    DeletePaymentOrderComponent,
    ChangePaymentOrderStatusComponent,
    InvitationComponent,
  ],
  providers: [
    AccountService,
    AlertService,
    ClientService,
    CompanyService,
    EventService,
    InvitationService,
    PaymentService,
    PlanService,
    TaskService,
    TokenService,
    {provide: LOCALE_ID, useValue: 'pt'},
    {provide: NgbDateParserFormatter, useClass: BrazilianNgbDateParserFormatter},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
