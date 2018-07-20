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
    return this.http.get<PaymentOrder>(RequestUtils.getApiUrl(`/payment_orders/${id}`), RequestUtils.getJsonOptions()).pipe(
      map((paymentOrderData: PaymentOrder) => new PaymentOrder(paymentOrderData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public updatePaymentOrder(paymentOrder: PaymentOrder, data: any): Observable<PaymentOrder> {
    return this.http.put<PaymentOrder>(RequestUtils.getApiUrl(`/payment_orders/${paymentOrder.id}`), data, RequestUtils.getJsonOptions()).pipe(
      map((paymentOrderData: PaymentOrder) => new PaymentOrder(paymentOrderData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public deletePaymentOrder(paymentOrder: PaymentOrder): Observable<void> {
    return this.http.delete<void>(RequestUtils.getApiUrl(`/payment_orders/${paymentOrder.id}`), RequestUtils.getJsonOptions()).pipe(
      map(() => null),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }
}
