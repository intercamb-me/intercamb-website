import * as hash from 'hash-code';
import isNil from 'lodash-es/isNil';
import isString from 'lodash-es/isString';

import {TaskChecklist} from '@models/task-checklist.model';
import {TaskField} from '@models/task-field.model';

export class Helpers {

  public static getColors(): string[] {
    return ['#e53935', '#d81b60', '#8e24aa', '#5e35b1', '#3949ab', '#1e88e5', '#039be5', '#00acc1', '#00897b', '#43a047', '#7cb342', '#c0ca33', '#fdd835', '#ffb300', '#fb8c00', '#f4511e', '#6d4c41', '#757575', '#546e7a'];
  }

  public static onlyDateChars(event: KeyboardEvent): boolean {
    const charCode = event.which || event.keyCode;
    // Accepts character '/' or numbers 0-9.
    if (charCode >= 47 && charCode <= 57) {
      return true;
    }
    return false;
  }

  public static onlyPhoneChars(event: KeyboardEvent): boolean {
    const pattern = /[0-9\+\-\s]/;
    const charCode = event.which || event.keyCode;
    const charStr = String.fromCharCode(charCode);
    if (!pattern.test(charStr)) {
      return true;
    }
    return false;
  }

  public static getColor(text: string): string {
    const colors = Helpers.getColors();
    let hashCode = hash.hashCode(text);
    if (hashCode < 0) {
      hashCode = hashCode * -1;
    }
    const index = hashCode % colors.length;
    return colors[index];
  }

  public static countFieldsFilled(fields: TaskField[]): number {
    let count = 0;
    fields.forEach((field) => {
      if (!isNil(field.value) && (!isString(field.value) || field.value.length > 0)) {
        count += 1;
      }
    });
    return count;
  }

  public static countChecklistItemsDone(checklist: TaskChecklist): number {
    let count = 0;
    checklist.items.forEach((item) => {
      if (item.done) {
        count += 1;
      }
    });
    return count;
  }

  private constructor() {

  }
}
