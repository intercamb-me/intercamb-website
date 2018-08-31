import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {EventService} from 'app/services/event.service';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';
import {Address} from 'app/models/address.model';
import {Client} from 'app/models/client.model';
import {PaymentOrder} from 'app/models/payment-order.model';
import {Plan} from 'app/models/plan.model';
import {Task} from 'app/models/task.model';
import {Token} from 'app/models/token.model';

@Injectable()
export class ClientService {

  constructor(private eventService: EventService, private httpClient: HttpClient) {

  }

  public createClient(data: any, token?: Token): Observable<Client> {
    const httpUrl = RequestUtils.getApiUrl('/clients');
    const httpOptions = RequestUtils.getJsonOptions();
    let params = new HttpParams();
    if (token) {
      params = params.set('token', token.id);
    }
    httpOptions.params = params;
    return this.httpClient.post<Client>(httpUrl, data, httpOptions).pipe(
      map((clientData: Client) => new Client(clientData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public getClient(id: string, options?: any): Observable<Client> {
    const httpUrl = RequestUtils.getApiUrl(`/clients/${id}`);
    const httpOptions = RequestUtils.getJsonOptions();
    let params = new HttpParams();
    params = RequestUtils.fillOptionsParams(params, options);
    httpOptions.params = params;
    return this.httpClient.get<Client>(httpUrl, httpOptions).pipe(
      map((clientData: Client) => new Client(clientData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public updateClient(client: Client, data: any): Observable<Client> {
    const httpUrl = RequestUtils.getApiUrl(`/clients/${client.id}`);
    return this.httpClient.put<Client>(httpUrl, data, RequestUtils.getJsonOptions()).pipe(
      map((clientData: Client) => new Client(clientData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public updateClientPhoto(client: Client, photo: File): Observable<Client> {
    const httpUrl = RequestUtils.getApiUrl(`/clients/${client.id}/photo`);
    const formData = new FormData();
    formData.append('photo', photo);
    return this.httpClient.put<Client>(httpUrl, formData, RequestUtils.getOptions()).pipe(
      map((clientData: Client) => new Client(clientData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public deleteClient(client: Client): Observable<void> {
    const httpUrl = RequestUtils.getApiUrl(`/clients/${client.id}`);
    return this.httpClient.delete<void>(httpUrl, RequestUtils.getJsonOptions()).pipe(
      map(() => null),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public associatePlan(client: Client, plan: Plan): Observable<void> {
    const httpUrl = RequestUtils.getApiUrl(`/clients/${client.id}/plans/${plan.id}`);
    return this.httpClient.post<void>(httpUrl, {}, RequestUtils.getJsonOptions()).pipe(
      map(() => null),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public dissociatePlan(client: Client): Observable<void> {
    const httpUrl = RequestUtils.getApiUrl(`/clients/${client.id}/plans`);
    return this.httpClient.delete<void>(httpUrl, RequestUtils.getJsonOptions()).pipe(
      map(() => null),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public createPaymentOrders(client: Client, paymentOrders: PaymentOrder[]): Observable<PaymentOrder[]> {
    const httpUrl = RequestUtils.getApiUrl(`/clients/${client.id}/payment_orders`);
    return this.httpClient.post<PaymentOrder[]>(httpUrl, paymentOrders, RequestUtils.getJsonOptions()).pipe(
      map((ordersData: PaymentOrder[]) => {
        const orders: PaymentOrder[] = [];
        ordersData.forEach((orderData) => {
          orders.push(new PaymentOrder(orderData));
        });
        return orders;
      }),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public createTask(client: Client, name: string): Observable<Task> {
    const httpUrl = RequestUtils.getApiUrl(`/clients/${client.id}/tasks`);
    return this.httpClient.post<Task>(httpUrl, {name}, RequestUtils.getJsonOptions()).pipe(
      map((taskData: Task) => new Task(taskData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public listTasks(client: Client, options?: any): Observable<Task[]> {
    const httpUrl = RequestUtils.getApiUrl(`/clients/${client.id}/tasks`);
    const httpOptions = RequestUtils.getJsonOptions();
    let params = new HttpParams();
    params = RequestUtils.fillOptionsParams(params, options);
    httpOptions.params = params;
    return this.httpClient.get<Task[]>(httpUrl, httpOptions).pipe(
      map((tasksData: Task[]) => {
        const tasks: Task[] = [];
        tasksData.forEach((taskData) => {
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

  public searchAddress(zipCode: string): Observable<Address> {
    const httpUrl = RequestUtils.getApiUrl(`/zip_codes/${zipCode}`);
    return this.httpClient.get<Address>(httpUrl, RequestUtils.getJsonOptions()).pipe(
      map((zipCodeData: Address) => new Address(zipCodeData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }
}
