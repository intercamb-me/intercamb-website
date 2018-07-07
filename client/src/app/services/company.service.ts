import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {Account} from 'app/models/account.model';
import {Company} from 'app/models/company.model';
import {Client} from 'app/models/client.model';
import {Task} from 'app/models/task.model';
import {EventService} from 'app/services/event.service';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';

@Injectable()
export class CompanyService {

  constructor(private eventService: EventService, private http: HttpClient) {

  }

  public createCompany(name: string): Observable<Company> {
    return this.http.post<Company>(RequestUtils.getApiUrl('/companies'), {name}, RequestUtils.getJsonOptions()).pipe(
      map((companyData: Company) => new Company(companyData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public getCompany(): Observable<Company> {
    return this.http.get<Company>(RequestUtils.getApiUrl('/companies/current'), RequestUtils.getJsonOptions()).pipe(
      map((companyData: Company) => companyData ? new Company(companyData) : null),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public updateCompanyLogo(logo: File): Observable<Company> {
    const formData = new FormData();
    formData.append('logo', logo);
    return this.http.put<Company>(RequestUtils.getApiUrl('/companies/current'), formData, RequestUtils.getOptions()).pipe(
      map((companyData: Company) => new Company(companyData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public listAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(RequestUtils.getApiUrl('/companies/current/accounts'), RequestUtils.getJsonOptions()).pipe(
      map((accountsData: Account[]) => {
        const accounts: Account[] = [];
        accountsData.forEach((accountData) => {
          accounts.push(new Account(accountData));
        });
        return accounts;
      }),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public listClients(): Observable<Client[]> {
    return this.http.get<Client[]>(RequestUtils.getApiUrl('/companies/current/clients'), RequestUtils.getJsonOptions()).pipe(
      map((clientsData: Client[]) => {
        const clients: Client[] = [];
        clientsData.forEach((clientData: any) => {
          clients.push(new Client(clientData));
        });
        return clients;
      }),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public listScheduledTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(RequestUtils.getApiUrl('/companies/current/tasks/scheduled'), RequestUtils.getJsonOptions()).pipe(
      map((tasksData: Task[]) => {
        const tasks: Task[] = [];
        tasksData.forEach((taskData: any) => {
          tasks.push(new Task(taskData));
        });
        return tasks;
      }),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }
}
