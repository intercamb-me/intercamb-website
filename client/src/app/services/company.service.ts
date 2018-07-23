import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
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
    const httpUrl = RequestUtils.getApiUrl('/companies/current');
    return this.http.get<Company>(httpUrl, RequestUtils.getJsonOptions()).pipe(
      map((companyData: Company) => companyData ? new Company(companyData) : null),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public createCompany(name: string): Observable<Company> {
    const httpUrl = RequestUtils.getApiUrl('/companies');
    return this.http.post<Company>(httpUrl, {name}, RequestUtils.getJsonOptions()).pipe(
      map((companyData: Company) => new Company(companyData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public updateCompany(data: any): Observable<Company> {
    const httpUrl = RequestUtils.getApiUrl('/companies/current');
    return this.http.put<Company>(httpUrl, data, RequestUtils.getJsonOptions()).pipe(
      map((companyData: Company) => new Company(companyData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public updateCompanyLogo(logo: File): Observable<Company> {
    const httpUrl = RequestUtils.getApiUrl('/companies/current/logo');
    const formData = new FormData();
    formData.append('logo', logo);
    return this.http.put<Company>(httpUrl, formData, RequestUtils.getOptions()).pipe(
      map((companyData: Company) => new Company(companyData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public listAccounts(): Observable<Account[]> {
    const httpUrl = RequestUtils.getApiUrl('/companies/current/accounts');
    return this.http.get<Account[]>(httpUrl, RequestUtils.getJsonOptions()).pipe(
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
    const httpUrl = RequestUtils.getApiUrl('/companies/current/plans');
    return this.http.get<Plan[]>(httpUrl, RequestUtils.getJsonOptions()).pipe(
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

  public listClients(ids?: string[], select?: string): Observable<Client[]> {
    const httpUrl = RequestUtils.getApiUrl('/companies/current/clients');
    const httpOptions = RequestUtils.getJsonOptions();
    let params = new HttpParams();
    if (ids) {
      ids.forEach((id) => {
        params = params.append('id', id);
      });
    }
    if (select) {
      params = params.set('select', select);
    }
    httpOptions.params = params;
    return this.http.get<Client[]>(httpUrl, httpOptions).pipe(
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

  public countClients(): Observable<number> {
    const httpUrl = RequestUtils.getApiUrl('/companies/current/clients/count');
    return this.http.get<number>(httpUrl, RequestUtils.getJsonOptions()).pipe(
      map((countData: any) => {
        return countData.count;
      }),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public searchClients(search: string, select?: string): Observable<Client[]> {
    const httpUrl = RequestUtils.getApiUrl('/companies/current/clients');
    const httpOptions = RequestUtils.getJsonOptions();
    let params = new HttpParams();
    params = params.set('search', search);
    if (select) {
      params = params.set('select', select);
    }
    httpOptions.params = params;
    return this.http.get<Client[]>(httpUrl, httpOptions).pipe(
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

  public listTasks(startDate: Date, endDate: Date): Observable<Task[]> {
    const httpUrl = RequestUtils.getApiUrl('/companies/current/tasks');
    const httpOptions = RequestUtils.getJsonOptions();
    let params = new HttpParams();
    params = params.set('start_time', String(startDate.getTime()));
    params = params.set('end_time', String(endDate.getTime()));
    httpOptions.params = params;
    return this.http.get<Task[]>(httpUrl, httpOptions).pipe(
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

  public countTasks(startDate: Date, endDate: Date): Observable<number> {
    const httpUrl = RequestUtils.getApiUrl('/companies/current/tasks/count');
    const httpOptions = RequestUtils.getJsonOptions();
    let params = new HttpParams();
    params = params.set('start_time', String(startDate.getTime()));
    params = params.set('end_time', String(endDate.getTime()));
    httpOptions.params = params;
    return this.http.get<number>(httpUrl, httpOptions).pipe(
      map((countData: any) => {
        return countData.count;
      }),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public getClientsPerMonthReport(): Observable<any> {
    const httpUrl = RequestUtils.getApiUrl('/companies/current/reports/clients_per_month');
    return this.http.get<any>(httpUrl, RequestUtils.getJsonOptions()).pipe(
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public getClientsPerPlanReport(): Observable<any> {
    const httpUrl = RequestUtils.getApiUrl('/companies/current/reports/clients_per_plan');
    return this.http.get<any>(httpUrl, RequestUtils.getJsonOptions()).pipe(
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public getBillingPerMonthReport(): Observable<any> {
    const httpUrl = RequestUtils.getApiUrl('/companies/current/reports/billing_per_month');
    return this.http.get<any>(httpUrl, RequestUtils.getJsonOptions()).pipe(
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }
}
