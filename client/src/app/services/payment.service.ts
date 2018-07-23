import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {EventService} from 'app/services/event.service';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';
import {PaymentOrder} from 'app/models/payment-order.model';

@Injectable()
export class PaymentService {

  constructor(private eventService: EventService, private http: HttpClient) {

  }

  public getPaymentOrder(id: string): Observable<PaymentOrder> {
    const httpUrl = RequestUtils.getApiUrl(`/payment_orders/${id}`);
    return this.http.get<PaymentOrder>(httpUrl, RequestUtils.getJsonOptions()).pipe(
      map((paymentOrderData: PaymentOrder) => new PaymentOrder(paymentOrderData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public updatePaymentOrder(paymentOrder: PaymentOrder, data: any): Observable<PaymentOrder> {
    const httpUrl = RequestUtils.getApiUrl(`/payment_orders/${paymentOrder.id}`);
    return this.http.put<PaymentOrder>(httpUrl, data, RequestUtils.getJsonOptions()).pipe(
      map((paymentOrderData: PaymentOrder) => new PaymentOrder(paymentOrderData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public deletePaymentOrder(paymentOrder: PaymentOrder): Observable<void> {
    const httpUrl = RequestUtils.getApiUrl(`/payment_orders/${paymentOrder.id}`);
    return this.http.delete<void>(httpUrl, RequestUtils.getJsonOptions()).pipe(
      map(() => null),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }
}
