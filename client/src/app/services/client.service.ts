import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {Client} from 'app/models/client.model';
import {Task} from 'app/models/task.model';
import {EventService} from 'app/services/event.service';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';

@Injectable()
export class ClientService {

  constructor(private eventService: EventService, private http: HttpClient) {

  }

  public getClient(id: string): Observable<Client> {
    return this.http.get<Client>(RequestUtils.getApiUrl(`/clients/${id}`), RequestUtils.getJsonOptions()).pipe(
      map((clientData: Client) => new Client(clientData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public createClient(data: any): Observable<Client> {
    return this.http.post<Client>(RequestUtils.getApiUrl('/clients'), data, RequestUtils.getJsonOptions()).pipe(
      map((clientData: Client) => new Client(clientData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(RequestUtils.getApiUrl(`/clients/${client.id}`), client, RequestUtils.getJsonOptions()).pipe(
      map((clientData: Client) => new Client(clientData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public listTasks(client: Client): Observable<Task[]> {
    return this.http.get<Task[]>(RequestUtils.getApiUrl(`/clients/${client.id}/tasks`), RequestUtils.getJsonOptions()).pipe(
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
}
