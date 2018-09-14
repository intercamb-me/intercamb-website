import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxMasonryOptions} from 'ngx-masonry';

import {CreateClientFormComponent} from '@components/company/clients/create-form/create-form.component';

import {CompanyService} from '@services/company.service';
import {AlertService} from '@services/alert.service';
import {Client} from '@models/client.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {

  private static readonly CLIENT_OPTIONS = {
    select: 'forename surname email phone photo_url',
    sort: 'registration_date:desc',
    limit: 20,
  };

  public clients: Client[];
  public lastClient: Client;
  public search: string;
  public currentSearch: string;
  public searching = false;
  public displayShowMoreButton = true;
  public loadingMore = false;
  public loading = true;

  public masonryOptions: NgxMasonryOptions = {
    itemSelector: '.col-6',
    horizontalOrder: true,
    transitionDuration: '0',
  };

  constructor(private companyService: CompanyService, private alertService: AlertService, private ngbModal: NgbModal) {

  }

  public ngOnInit(): void {
    this.companyService.listClients(null, ClientsComponent.CLIENT_OPTIONS).subscribe((clients) => {
      this.clients = clients;
      this.loading = false;
      if (this.clients.length > 0) {
        this.search = '';
        this.lastClient = this.clients[this.clients.length - 1];
      }
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível carregar a lista de clientes, por favor tente novamente mais tarde!');
    });
  }

  public trackByClient(_index: number, client: Client): string {
    return client.id;
  }

  public openSendForm(): void {
    this.ngbModal.open(CreateClientFormComponent, {
      backdrop: 'static',
      keyboard: false,
    });
  }

  public searchClients(): void {
    this.searching = true;
    this.currentSearch = this.search;
    this.companyService.searchClients(this.currentSearch, ClientsComponent.CLIENT_OPTIONS).subscribe((clients) => {
      this.clients = clients;
      this.displayShowMoreButton = true;
      this.searching = false;
    }, (err) => {
      this.searching = false;
      this.alertService.apiError(null, err);
    });
  }

  public loadMoreClients(): void {
    this.loadingMore = true;
    let observable;
    if (this.currentSearch) {
      observable = this.companyService.searchClients(this.currentSearch, {...ClientsComponent.CLIENT_OPTIONS, last: this.lastClient.id});
    } else {
      observable = this.companyService.listClients(null, {...ClientsComponent.CLIENT_OPTIONS, last: this.lastClient.id});
    }
    observable.subscribe((clients) => {
      if (clients.length > 0) {
        this.clients.push(...clients);
        this.lastClient = this.clients[this.clients.length - 1];
      } else {
        this.displayShowMoreButton = false;
      }
      this.loadingMore = false;
    }, (err) => {
      this.loadingMore = false;
      this.alertService.apiError(null, err, 'Não foi possível carregar mais clientes, por favor tente novamente mais tarde!');
    });
  }
}
