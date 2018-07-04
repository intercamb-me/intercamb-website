import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {Client} from 'app/models/client.model';
import {Task} from 'app/models/task.model';
import {TaskComment} from 'app/models/task-comment.model';
import {EventService} from 'app/services/event.service';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';

@Injectable()
export class ClientService {

  constructor(private eventService: EventService, private http: HttpClient) {

  }

  public listClients(): Observable<Client[]> {
    return this.http.get<Client[]>(RequestUtils.getApiUrl('/clients'), RequestUtils.getJsonOptions()).pipe(
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

  public getTask(client: Client, id: string): Observable<Task> {
    return this.http.get<Task>(RequestUtils.getApiUrl(`/clients/${client.id}/tasks/${id}`), RequestUtils.getJsonOptions()).pipe(
      map((taskData: Task) => new Task(taskData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public updateTask(client: Client, task: Task, data: any): Observable<Task> {
    return this.http.put<Task>(RequestUtils.getApiUrl(`/clients/${client.id}/tasks/${task.id}`), data, RequestUtils.getJsonOptions()).pipe(
      map((taskData: Task) => new Task(taskData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public addTaskComment(client: Client, task: Task, text: string): Observable<TaskComment> {
    return this.http.post<any>(RequestUtils.getApiUrl(`/clients/${client.id}/tasks/${task.id}/comments`), {text}, RequestUtils.getJsonOptions()).pipe(
      map((commentData: TaskComment) => new TaskComment(commentData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }
}
