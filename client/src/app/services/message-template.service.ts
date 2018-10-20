import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {EventService} from '@services/event.service';
import {ApiError} from '@services/commons/api.error';
import {RequestUtils} from '@utils/request.utils';
import {MessageTemplate} from '@models/message-template.model';

@Injectable()
export class MessageTemplateService {

  constructor(private eventService: EventService, private httpClient: HttpClient) {

  }

  public createMessageTemplate(data: any): Observable<MessageTemplate> {
    const httpUrl = RequestUtils.getApiUrl('/message_templates');
    const httpOptions = RequestUtils.getJsonOptions();
    return this.httpClient.post<MessageTemplate>(httpUrl, data, httpOptions).pipe(
      map((messageTemplateData: MessageTemplate) => new MessageTemplate(messageTemplateData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public getMessageTemplate(id: string, options?: any): Observable<MessageTemplate> {
    const httpUrl = RequestUtils.getApiUrl(`/message_templates/${id}`);
    const httpOptions = RequestUtils.getJsonOptions();
    let params = new HttpParams();
    params = RequestUtils.fillOptionsParams(params, options);
    httpOptions.params = params;
    return this.httpClient.get<MessageTemplate>(httpUrl, httpOptions).pipe(
      map((taskData: MessageTemplate) => new MessageTemplate(taskData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public updateMessageTemplate(messageTemplate: MessageTemplate, data: any): Observable<MessageTemplate> {
    const httpUrl = RequestUtils.getApiUrl(`/message_templates/${messageTemplate.id}`);
    return this.httpClient.put<MessageTemplate>(httpUrl, data, RequestUtils.getJsonOptions()).pipe(
      map((messageTemplateData: MessageTemplate) => new MessageTemplate(messageTemplateData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public deleteMessageTemplate(messageTemplate: MessageTemplate): Observable<void> {
    const httpUrl = RequestUtils.getApiUrl(`/message_templates/${messageTemplate.id}`);
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
