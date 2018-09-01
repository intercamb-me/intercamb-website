import {Injectable} from '@angular/core';
import {Subscription, Subject} from 'rxjs';

import {ApiError} from '@services/commons/api.error';
import {ErrorUtils} from '@utils/error.utils';

export interface Alert {
  type: string;
  id?: string;
  message: string;
}

@Injectable()
export class AlertService {

  private subject: Subject<Alert>;

  constructor() {
    this.subject = new Subject();
  }

  public subscribe(callback: (alert: Alert) => void): Subscription {
    return this.subject.subscribe(callback);
  }

  public success(message: string): void {
    this.subject.next({message, type: 'success'});
  }

  public info(message: string): void {
    this.subject.next({message, type: 'info'});
  }

  public warn(message: string): void {
    this.subject.next({message, type: 'warning'});
  }

  public error(message: string): void {
    this.subject.next({message, type: 'danger'});
  }

  public apiError(context: string, err: ApiError, errorMessage?: string): void {
    const message = ErrorUtils.getErrorMessage(context, err, errorMessage);
    if (message) {
      this.subject.next({message, id: err.code, type: 'danger'});
    }
  }
}
