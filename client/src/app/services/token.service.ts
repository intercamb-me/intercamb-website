import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {Token} from 'app/models/token.model';
import {EventService} from 'app/services/event.service';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';

@Injectable()
export class TokenService {

  constructor(private eventService: EventService, private http: HttpClient) {

  }

  public createToken(identifier: string, type: string): Observable<Token> {
    return this.http.post<Token>(RequestUtils.getApiUrl('/tokens'), {identifier, type}, RequestUtils.getJsonOptions()).pipe(
      map((tokenData: Token) => new Token(tokenData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }
}
