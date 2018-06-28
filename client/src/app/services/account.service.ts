import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {Account} from 'app/models/account.model';
import {EventService} from 'app/services/event.service';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';
import {StorageUtils} from 'app/utils/storage.utils';

interface LoginResult {
  token: string;
  account: Account;
}

@Injectable()
export class AccountService {

  constructor(private eventService: EventService, private http: HttpClient) {

  }

  public createAccount(name: string, email: string, password: string): Observable<Account> {
    return this.http.post<Account>(RequestUtils.getApiUrl('/accounts'), {name, email, password}, RequestUtils.getJsonOptions()).pipe(
      map((accountData: Account) => new Account(accountData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public getCurrentAccount(): Observable<Account> {
    return this.http.get<Account>(RequestUtils.getApiUrl('/accounts/current'), RequestUtils.getJsonOptions()).pipe(
      map((accountData: Account) => accountData ? new Account(accountData) : null),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public login(email: string, password: string): Observable<Account> {
    return this.http.post<LoginResult>(RequestUtils.getApiUrl('/accounts/login'), {email, password}, RequestUtils.getJsonOptions()).pipe(
      map((loginData: LoginResult) => {
        StorageUtils.setApiToken(loginData.token);
        return new Account(loginData.account);
      }),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }
}
