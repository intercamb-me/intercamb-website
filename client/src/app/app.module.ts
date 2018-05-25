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

import {MainComponent} from 'app/components/main/main.component';
import {HeaderComponent} from 'app/components/main/header/header.component';
import {FooterComponent} from 'app/components/main/footer/footer.component';
import {AlertsComponent} from 'app/components/main/alerts/alerts.component';
import {NotFoundComponent} from 'app/components/main/not-found/not-found.component';
import {HomeComponent} from 'app/components/main/home/home.component';

// Services
import {AppService} from 'app/services/app.service';
import {AlertService} from 'app/services/alert.service';

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
    MainComponent,
    HeaderComponent,
    FooterComponent,
    AlertsComponent,
    NotFoundComponent,
    HomeComponent,
  ],
  entryComponents: [],
  providers: [
    AppService,
    AlertService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
