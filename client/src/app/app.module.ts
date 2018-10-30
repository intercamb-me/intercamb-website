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
  NgbCollapseModule,
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
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronRight';
import {faClock} from '@fortawesome/free-solid-svg-icons/faClock';
import {faCog} from '@fortawesome/free-solid-svg-icons/faCog';
import {faComment} from '@fortawesome/free-solid-svg-icons/faComment';
import {faCreditCard} from '@fortawesome/free-solid-svg-icons/faCreditCard';
import {faDollarSign} from '@fortawesome/free-solid-svg-icons/faDollarSign';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons/faEnvelopeOpen';
import {faFacebook} from '@fortawesome/free-brands-svg-icons/faFacebook';
import {faGraduationCap} from '@fortawesome/free-solid-svg-icons/faGraduationCap';
import {faHashtag} from '@fortawesome/free-solid-svg-icons/faHashtag';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faInstagram} from '@fortawesome/free-brands-svg-icons/faInstagram';
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
import {faTwitter} from '@fortawesome/free-brands-svg-icons/faTwitter';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faUsers} from '@fortawesome/free-solid-svg-icons/faUsers';

// Other 3rd libraries
import {NgxMaskModule} from 'ngx-mask';
import {NgxMasonryModule} from 'ngx-masonry';
import {ClipboardModule} from 'ngx-clipboard';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {AutofocusModule} from 'angular-autofocus-fix';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

// Routes
import {AppRoutes} from '@app/app.routes';

// Components
import {AppComponent} from '@app/app.component';
import {AlertsComponent} from '@components/alerts/alerts.component';
import {HeaderComponent} from '@components/header/header.component';
import {FooterComponent} from '@components/footer/footer.component';
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
import {SaveClientComponent} from '@components/company/client/save/save.component';
import {CreateClientComponent} from '@components/company/client/create/create.component';
import {EditClientComponent} from '@components/company/client/edit/edit.component';
import {CalendarComponent} from '@components/company/calendar/calendar.component';
import {ReportsComponent} from '@components/company/reports/reports.component';
import {CompanySettingsComponent} from '@components/company/settings/settings.component';
import {AccountSettingsComponent} from '@components/account/settings/settings.component';
import {NotFoundComponent} from '@components/not-found/not-found.component';

// Shared Components
import {MaterialPalettePickerComponent} from '@components/shared/material-palette-picker/material-palette-picker.component';
import {EditDefaultTaskComponent} from '@components/shared/edit-default-task/edit-default-task.component';
import {TaskFieldsComponent} from '@components/shared/task/fields/fields.component';
import {TaskChecklistsComponent} from '@components/shared/task/checklists/checklists.component';
import {AddTaskFieldComponent} from '@components/shared/task/add-field/add-field.component';
import {AddTaskChecklistComponent} from '@components/shared/task/add-checklist/add-checklist.component';

// Modals
import {CreateClientFormComponent} from '@components/company/clients/create-form/create-form.component';
import {DeleteClientComponent} from '@components/company/client/delete/delete.component';
import {CreateTaskComponent} from '@components/company/client/create-task/create-task.component';
import {TaskComponent} from '@components/company/task/task.component';
import {ChangeTaskStatusComponent} from '@components/company/task/change-status/change-status.component';
import {SetTaskScheduleDateComponent} from '@components/company/task/set-schedule-date/set-schedule-date.component';
import {SetTaskLocationComponent} from '@components/company/task/set-location/set-location.component';
import {DeleteTaskComponent} from '@components/company/task/delete/delete.component';
import {SearchAddressComponent} from '@components/company/client/search-address/search-address.component';
import {RemoveAccountComponent} from '@components/company/settings/remove-account/remove-account.component';
import {SaveInstitutionsComponent} from '@components/company/settings/save-institutions/save-institutions.component';
import {SaveMessageTemplateComponent} from '@components/company/settings/message-template/save/save.component';
import {DeleteMessageTemplateComponent} from '@components/company/settings/message-template/delete/delete.component';
import {SendMessagesComponent} from '@components/company/client/send-messages/send-messages.component';
import {SaveDefaultTaskComponent} from '@components/company/settings/default-task/save/save.component';
import {DeleteDefaultTaskComponent} from '@components/company/settings/default-task/delete/delete.component';
import {SavePlanComponent} from '@components/company/settings/plan/save/save.component';
import {DeletePlanComponent} from '@components/company/settings/plan/delete/delete.component';
import {AssociatePlanComponent} from '@components/company/client/associate-plan/associate-plan.component';
import {CreatePaymentOrderComponent} from '@components/company/client/payment-order/create/create.component';
import {EditPaymentOrderComponent} from '@components/company/client/payment-order/edit/edit.component';
import {DeletePaymentOrderComponent} from '@components/company/client/payment-order/delete/delete.component';
import {ChangePaymentOrderStatusComponent} from '@components/company/client/payment-order/change-status/change-status.component';
import {InvitationComponent} from '@components/company/settings/invitation/invitation.component';

// Services
import {AccountService} from '@services/account.service';
import {AlertService} from '@services/alert.service';
import {ClientService} from '@services/client.service';
import {CompanyService} from '@services/company.service';
import {DefaultTaskService} from '@services/default-task.service';
import {EventService} from '@services/event.service';
import {InvitationService} from '@services/invitation.service';
import {MessageTemplateService} from '@services/message-template.service';
import {PaymentService} from '@services/payment.service';
import {PlanService} from '@services/plan.service';
import {TaskService} from '@services/task.service';
import {TokenService} from '@services/token.service';

// Directives
import {GooglePlacesDirective} from '@directives/google-places/google-places.directive';

// Utilities
import {
  CapitalizeFirstPipe,
  MapValuesPipe,
  ValuesPipe,
  SizePipe,
  HyphensIfEmptyPipe,
  CurrencySymbolPipe,
  BrazilianNgbDateParserFormatter,
} from '@utils/angular.utils';

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
library.add(faChevronLeft);
library.add(faChevronRight);
library.add(faClock);
library.add(faCog);
library.add(faComment);
library.add(faCreditCard);
library.add(faDollarSign);
library.add(faEdit);
library.add(faEllipsisV);
library.add(faEnvelope);
library.add(faEnvelopeOpen);
library.add(faGraduationCap);
library.add(faFacebook);
library.add(faHashtag);
library.add(faHome);
library.add(faInstagram);
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
library.add(faTwitter);
library.add(faUser);
library.add(faUsers);

@NgModule({
  imports: [
    AutofocusModule,
    BrowserAnimationsModule,
    BrowserModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    CKEditorModule,
    ClipboardModule,
    FontAwesomeModule,
    FormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    HttpClientModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    NgbAlertModule.forRoot(),
    NgbCollapseModule.forRoot(),
    NgbDatepickerModule.forRoot(),
    NgbDropdownModule.forRoot(),
    NgbModalModule.forRoot(),
    NgbPopoverModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgxMasonryModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes.listRoutes()),
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
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    PlansComponent,
    TermsComponent,
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
    TaskFieldsComponent,
    TaskChecklistsComponent,
    AddTaskFieldComponent,
    AddTaskChecklistComponent,
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
    SaveInstitutionsComponent,
    SaveMessageTemplateComponent,
    DeleteMessageTemplateComponent,
    SendMessagesComponent,
    SaveDefaultTaskComponent,
    DeleteDefaultTaskComponent,
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
    SaveInstitutionsComponent,
    SaveMessageTemplateComponent,
    DeleteMessageTemplateComponent,
    SendMessagesComponent,
    SaveDefaultTaskComponent,
    DeleteDefaultTaskComponent,
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
    DefaultTaskService,
    EventService,
    InvitationService,
    MessageTemplateService,
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
