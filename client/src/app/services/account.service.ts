import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {EventService} from 'app/services/event.service';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';
import {StorageUtils} from 'app/utils/storage.utils';
import {Account} from 'app/models/account.model';

interface LoginResult {
  token: string;
  account: Account;
}

@Injectable()
export class AccountService {

  constructor(private eventService: EventService, private http: HttpClient) {

  }

  public createAccount(firstName: string, lastName: string, email: string, password: string): Observable<Account> {
    const httpUrl = RequestUtils.getApiUrl('/accounts');
    return this.http.post<Account>(httpUrl, {email, password, first_name: firstName, last_name: lastName}, RequestUtils.getJsonOptions()).pipe(
      map((accountData: Account) => new Account(accountData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public getAccount(): Observable<Account> {
    const httpUrl = RequestUtils.getApiUrl('/accounts/current');
    return this.http.get<Account>(httpUrl, RequestUtils.getJsonOptions()).pipe(
      map((accountData: Account) => accountData ? new Account(accountData) : null),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public updateAccount(data: any): Observable<Account> {
    const httpUrl = RequestUtils.getApiUrl('/accounts/current');
    return this.http.put<Account>(httpUrl, data, RequestUtils.getJsonOptions()).pipe(
      map((accountData: Account) => new Account(accountData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public updateAccountImage(image: File): Observable<Account> {
    const httpUrl = RequestUtils.getApiUrl('/accounts/current/image');
    const formData = new FormData();
    formData.append('image', image);
    return this.http.put<Account>(httpUrl, formData, RequestUtils.getOptions()).pipe(
      map((accountData: Account) => new Account(accountData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public login(email: string, password: string): Observable<Account> {
    const httpUrl = RequestUtils.getApiUrl('/accounts/login');
    return this.http.post<LoginResult>(httpUrl, {email, password}, RequestUtils.getJsonOptions()).pipe(
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

  public logout(): Observable<void> {
    const httpUrl = RequestUtils.getApiUrl('/accounts/logout');
    return this.http.post<void>(httpUrl, null, RequestUtils.getJsonOptions()).pipe(
      map(() => {
        StorageUtils.removeApiToken();
        return null;
      }),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }
}
