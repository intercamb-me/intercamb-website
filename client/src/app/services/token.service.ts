import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {EventService} from 'app/services/event.service';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';
import {Token} from 'app/models/token.model';

@Injectable()
export class TokenService {

  constructor(private eventService: EventService, private httpClient: HttpClient) {

  }

  public createToken(identifier: string, type: string): Observable<Token> {
    const httpUrl = RequestUtils.getApiUrl('/tokens');
    return this.httpClient.post<Token>(httpUrl, {identifier, type}, RequestUtils.getJsonOptions()).pipe(
      map((tokenData: Token) => new Token(tokenData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public getToken(id: string): Observable<Token> {
    const httpUrl = RequestUtils.getApiUrl(`/tokens/${id}`);
    return this.httpClient.get<Token>(httpUrl, RequestUtils.getJsonOptions()).pipe(
      map((tokenData: Token) => new Token(tokenData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }
}
