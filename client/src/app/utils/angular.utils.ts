import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {NgbDateParserFormatter, NgbDateStruct, NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import padStart from 'lodash-es/padStart';
import forEach from 'lodash-es/forEach';
import size from 'lodash-es/size';
import isEmpty from 'lodash-es/isEmpty';

@Pipe({name: 'capitalizeFirst'})
export class CapitalizeFirstPipe implements PipeTransform {

  public transform(value: string): string {
    if (!value) {
      return 'Not assigned';
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

@Pipe({name: 'mapValues'})
export class MapValuesPipe implements PipeTransform {

  public transform(object: any): any[] {
    const values: any[] = [];
    forEach(object, (value, key) => {
      values.push({key, value});
    });
    return values;
  }
}

@Pipe({name: 'size'})
export class SizePipe implements PipeTransform {

  public transform(object: any): number {
    return size(object);
  }
}

@Pipe({name: 'hyphensIfEmpty'})
export class HyphensIfEmpty implements PipeTransform {

  public transform(object: any): any {
    if (!object || isEmpty(String(object))) {
      return '----';
    }
    return object;
  }
}

@Injectable()
export class BrazilianNgbDateParserFormatter extends NgbDateParserFormatter {

  public parse(dateStr: string): NgbDateStruct {
    if (!dateStr) {
      return {year: null, month: null, day: null};
    }
    const dateSplit = dateStr.split('/');
    return {
      day: Number(dateSplit[0]),
      month: Number(dateSplit[1]) - 1,
      year: Number(dateSplit[2]),
    };
  }

  public format(dateStruct: NgbDateStruct): string {
    if (!dateStruct) {
      return '';
    }
    const day = padStart(String(dateStruct.day), 2, '0');
    const month = padStart(String(dateStruct.month), 2, '0');
    const year = padStart(String(dateStruct.year), 4, '0');
    return `${day}/${month}/${year}`;
  }
}

@Injectable()
export class BrazilianNgbDatepickerI18n extends NgbDatepickerI18n {

  private static readonly DEFAULT_LANGUAGE = 'pt-br';
  private static readonly I18N_VALUES = {
    'pt-br': {
      weekdays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
      months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      monthsFullNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    },
  };

  public getWeekdayShortName(weekday: number): string {
    const i18n = BrazilianNgbDatepickerI18n.I18N_VALUES;
    return i18n[BrazilianNgbDatepickerI18n.DEFAULT_LANGUAGE].weekdays[weekday - 1];
  }

  public getMonthShortName(month: number): string {
    const i18n = BrazilianNgbDatepickerI18n.I18N_VALUES;
    return i18n[BrazilianNgbDatepickerI18n.DEFAULT_LANGUAGE].months[month - 1];
  }

  public getMonthFullName(month: number): string {
    const i18n = BrazilianNgbDatepickerI18n.I18N_VALUES;
    return i18n[BrazilianNgbDatepickerI18n.DEFAULT_LANGUAGE].monthsFullNames[month - 1];
  }

  public getDayAriaLabel(dateStruct: NgbDateStruct): string {
    return `${dateStruct.day}-${dateStruct.month}-${dateStruct.year}`;
  }
}

export function onlyDateChars(event: KeyboardEvent): boolean {
  const charCode = event.which || event.keyCode;
  // Accepts character '/' or numbers 0-9.
  if (charCode >= 47 && charCode <= 57) {
    return true;
  }
  return false;
}

export function onlyPhoneChars(event: KeyboardEvent): boolean {
  const pattern = /[0-9\+\-\s]/;
  const charCode = event.which || event.keyCode;
  const charStr = String.fromCharCode(charCode);
  if (!pattern.test(charStr)) {
    return true;
  }
  return false;
}
