import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {mergeMap} from 'rxjs/operators';

import {ChangeDocumentStatusComponent} from 'app/components/company/document/change-status/change-document-status.component';

import {ClientService} from 'app/services/client.service';
import {AlertService} from 'app/services/alert.service';
import {Constants} from 'app/utils/constants';
import {Client} from 'app/models/client.model';
import {Document} from 'app/models/document.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
})
export class ClientComponent implements OnInit {

  public client: Client;
  public documents: Document[];
  public loading = true;
  public clientInfoIndex = 0;

  public documentTypes = Constants.DOCUMENT_TYPES;
  public documentStatus = Constants.DOCUMENT_STATUS;

  constructor(private clientService: ClientService, private alertService: AlertService, private activatedRoute: ActivatedRoute, private ngbModal: NgbModal) {

  }

  public ngOnInit(): void {
    const clientId = this.activatedRoute.snapshot.paramMap.get('client');
    this.clientService.getClient(clientId).pipe(
      mergeMap((client) => {
        this.client = client;
        return this.clientService.listDocuments(client);
      })
    ).subscribe((documents) => {
      this.documents = documents;
      this.loading = false;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  public trackByDocument(_index: number, document: Document): string {
    return document.id;
  }

  public hasIdentityDocument(): boolean {
    const identityCard = this.client.personal_data.identity_document;
    if (identityCard && identityCard.number && identityCard.issuing_authority && identityCard.state) {
      return true;
    }
    return false;
  }

  public hasPlaceOfBirth(): boolean {
    const placeOfBirth = this.client.personal_data.place_of_birth;
    if (placeOfBirth && placeOfBirth.city && placeOfBirth.state) {
      return true;
    }
    return false;
  }

  public nextClientInfo(): void {
    this.clientInfoIndex = this.clientInfoIndex + 1;
  }

  public previousClientInfo(): void {
    this.clientInfoIndex = this.clientInfoIndex - 1;
  }

  public changeDocumentStatus(document: Document): void {
    const modalRef = this.ngbModal.open(ChangeDocumentStatusComponent);
    modalRef.componentInstance.client = this.client;
    modalRef.componentInstance.document = document;
    modalRef.result.then((updatedDocument) => {
      const index = this.documents.findIndex((currentDocument) => {
        return currentDocument.id === updatedDocument.id;
      });
      this.documents[index] = updatedDocument;
    }).catch(() => {
      // Nothing to do...
    });
  }
}
