import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {Company} from 'app/models/company.model';
import {EventService} from 'app/services/event.service';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';

@Injectable()
export class CompanyService {

  constructor(private eventService: EventService, private http: HttpClient) {

  }

  public createCompany(name: string): Observable<Company> {
    return this.http.post<Company>(RequestUtils.getApiUrl('/companies'), {name}, RequestUtils.getJsonOptions()).pipe(
      map((company: Company) => new Company(company)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public getCurrentCompany(): Observable<Company> {
    return this.http.get<Company>(RequestUtils.getApiUrl('/companies/current'), RequestUtils.getJsonOptions()).pipe(
      map((data: Company) => data ? new Company(data) : null),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public updateCurrentCompanyLogo(logo: File): Observable<Company> {
    const formData = new FormData();
    formData.append('logo', logo);
    return this.http.put<Company>(RequestUtils.getApiUrl('/companies/current'), formData, RequestUtils.getOptions()).pipe(
      map((data: Company) => new Company(data)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }
}
