import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {EventService} from '@services/event.service';
import {ApiError} from '@services/commons/api.error';
import {RequestUtils} from '@utils/request.utils';
import {Plan} from '@models/plan.model';

@Injectable()
export class PlanService {

  constructor(private eventService: EventService, private httpClient: HttpClient) {

  }

  public createPlan(data: any): Observable<Plan> {
    const httpUrl = RequestUtils.getApiUrl('/plans');
    return this.httpClient.post<Plan>(httpUrl, data, RequestUtils.getJsonOptions()).pipe(
      map((planData: Plan) => new Plan(planData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public getPlan(id: string): Observable<Plan> {
    const httpUrl = RequestUtils.getApiUrl(`/plans/${id}`);
    return this.httpClient.get<Plan>(httpUrl, RequestUtils.getJsonOptions()).pipe(
      map((planData: Plan) => new Plan(planData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public updatePlan(plan: Plan, data: any): Observable<Plan> {
    const httpUrl = RequestUtils.getApiUrl(`/plans/${plan.id}`);
    return this.httpClient.put<Plan>(httpUrl, data, RequestUtils.getJsonOptions()).pipe(
      map((planData: Plan) => new Plan(planData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public deletePlan(plan: Plan): Observable<void> {
    const httpUrl = RequestUtils.getApiUrl(`/plans/${plan.id}`);
    return this.httpClient.delete<void>(httpUrl, RequestUtils.getJsonOptions()).pipe(
      map(() => null),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }
}
