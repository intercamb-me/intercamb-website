import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {EventService} from 'app/services/event.service';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';
import {Plan} from 'app/models/plan.model';

@Injectable()
export class PlanService {

  constructor(private eventService: EventService, private http: HttpClient) {

  }

  public getPlan(id: string): Observable<Plan> {
    const httpUrl = RequestUtils.getApiUrl(`/plans/${id}`);
    return this.http.get<Plan>(httpUrl, RequestUtils.getJsonOptions()).pipe(
      map((planData: Plan) => new Plan(planData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public createPlan(name: string, price: number): Observable<Plan> {
    const httpUrl = RequestUtils.getApiUrl('/plans');
    return this.http.post<Plan>(httpUrl, {name, price}, RequestUtils.getJsonOptions()).pipe(
      map((planData: Plan) => new Plan(planData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public updatePlan(plan: Plan): Observable<Plan> {
    const httpUrl = RequestUtils.getApiUrl(`/plans/${plan.id}`);
    return this.http.put<Plan>(httpUrl, plan, RequestUtils.getJsonOptions()).pipe(
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
