import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {EventService} from '@services/event.service';
import {ApiError} from '@services/commons/api.error';
import {RequestUtils} from '@utils/request.utils';
import {DefaultTask} from '@models/default-task.model';

@Injectable()
export class DefaultTaskService {

  constructor(private eventService: EventService, private httpClient: HttpClient) {

  }

  public createDefaultTask(data: any): Observable<DefaultTask> {
    const httpUrl = RequestUtils.getApiUrl('/default_tasks');
    const httpOptions = RequestUtils.getJsonOptions();
    return this.httpClient.post<DefaultTask>(httpUrl, data, httpOptions).pipe(
      map((defaultTaskData: DefaultTask) => new DefaultTask(defaultTaskData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public getDefaultTask(id: string, options?: any): Observable<DefaultTask> {
    const httpUrl = RequestUtils.getApiUrl(`/default_tasks/${id}`);
    const httpOptions = RequestUtils.getJsonOptions();
    let params = new HttpParams();
    params = RequestUtils.fillOptionsParams(params, options);
    httpOptions.params = params;
    return this.httpClient.get<DefaultTask>(httpUrl, httpOptions).pipe(
      map((taskData: DefaultTask) => new DefaultTask(taskData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public updateDefaultTask(defaultTask: DefaultTask, data: any): Observable<DefaultTask> {
    const httpUrl = RequestUtils.getApiUrl(`/default_tasks/${defaultTask.id}`);
    return this.httpClient.put<DefaultTask>(httpUrl, data, RequestUtils.getJsonOptions()).pipe(
      map((defaultTaskData: DefaultTask) => new DefaultTask(defaultTaskData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public deleteDefaultTask(defaultTask: DefaultTask): Observable<void> {
    const httpUrl = RequestUtils.getApiUrl(`/default_tasks/${defaultTask.id}`);
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
