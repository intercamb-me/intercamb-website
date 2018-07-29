import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {EventService} from 'app/services/event.service';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';
import {Client} from 'app/models/client.model';
import {Token} from 'app/models/token.model';
import {Plan} from 'app/models/plan.model';
import {PaymentOrder} from 'app/models/payment-order.model';
import {Address} from 'app/models/address.model';

@Injectable()
export class ClientService {

  constructor(private eventService: EventService, private http: HttpClient) {

  }

  public createClient(data: any, token?: Token): Observable<Client> {
    const httpUrl = RequestUtils.getApiUrl('/clients');
    const httpOptions = RequestUtils.getJsonOptions();
    let params = new HttpParams();
    if (token) {
      params = params.set('token', token.id);
    }
    httpOptions.params = params;
    return this.http.post<Client>(httpUrl, data, httpOptions).pipe(
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
    return this.http.get<Client>(httpUrl, httpOptions).pipe(
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
    return this.http.put<Client>(httpUrl, data, RequestUtils.getJsonOptions()).pipe(
      map((clientData: Client) => new Client(clientData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public associatePlan(client: Client, plan: Plan): Observable<void> {
    const httpUrl = RequestUtils.getApiUrl(`/clients/${client.id}/plans/${plan.id}`);
    return this.http.post<void>(httpUrl, {}, RequestUtils.getJsonOptions()).pipe(
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
    return this.http.delete<void>(httpUrl, RequestUtils.getJsonOptions()).pipe(
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
    return this.http.post<PaymentOrder>(httpUrl, paymentOrders, RequestUtils.getJsonOptions()).pipe(
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

  public searchAddress(zipCode: string): Observable<Address> {
    const httpUrl = RequestUtils.getApiUrl(`/zip_codes/${zipCode}`);
    return this.http.get<Address>(httpUrl, RequestUtils.getJsonOptions()).pipe(
      map((zipCodeData: Address) => new Address(zipCodeData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }
}
