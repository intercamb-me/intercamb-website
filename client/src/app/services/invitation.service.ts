import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {EventService} from '@services/event.service';
import {ApiError} from '@services/commons/api.error';
import {RequestUtils} from '@utils/request.utils';

@Injectable()
export class InvitationService {

  constructor(private eventService: EventService, private httpClient: HttpClient) {

  }

  public createInvitation(email: string): Observable<Account> {
    const httpUrl = RequestUtils.getApiUrl('/invitations');
    return this.httpClient.post<void>(httpUrl, {email}, RequestUtils.getJsonOptions()).pipe(
      map(() => null),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }
}
