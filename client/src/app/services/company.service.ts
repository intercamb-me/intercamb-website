import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {EventService} from 'app/services/event.service';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';
import {Account} from 'app/models/account.model';
import {Company} from 'app/models/company.model';
import {Plan} from 'app/models/plan.model';
import {Client} from 'app/models/client.model';
import {Task} from 'app/models/task.model';

@Injectable()
export class CompanyService {

  constructor(private eventService: EventService, private http: HttpClient) {

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

  public updateCompany(data: any): Observable<Company> {
    return this.http.put<Company>(RequestUtils.getApiUrl(`/companies/current`), data, RequestUtils.getJsonOptions()).pipe(
      map((companyData: Company) => new Company(companyData)),
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
    return this.http.put<Company>(RequestUtils.getApiUrl('/companies/current/logo'), formData, RequestUtils.getOptions()).pipe(
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

  public listPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(RequestUtils.getApiUrl('/companies/current/plans'), RequestUtils.getJsonOptions()).pipe(
      map((plansData: Plan[]) => {
        const plans: Plan[] = [];
        plansData.forEach((planData) => {
          plans.push(new Plan(planData));
        });
        return plans;
      }),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public listClients(ids?: string[]): Observable<Client[]> {
    let url = '/companies/current/clients';
    if (ids) {
      const idsQuery: string[] = [];
      ids.forEach((id) => {
        idsQuery.push(`id=${id}`);
      });
      url += `?${idsQuery.join('&')}`;
    }
    return this.http.get<Client[]>(RequestUtils.getApiUrl(url), RequestUtils.getJsonOptions()).pipe(
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

  public listScheduledTasks(startDate: Date, endDate: Date): Observable<Task[]> {
    const url = `/companies/current/tasks/scheduled?start_time=${startDate.getTime()}&end_time=${endDate.getTime()}`;
    return this.http.get<Task[]>(RequestUtils.getApiUrl(url), RequestUtils.getJsonOptions()).pipe(
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
