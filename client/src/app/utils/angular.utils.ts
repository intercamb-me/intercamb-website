import {Injectable} from '@angular/core';
import {NgbDateParserFormatter, NgbDateStruct, NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import * as parseDate from 'date-fns/parse';
import * as formatDate from 'date-fns/format';
import * as getYear from 'date-fns/getYear';
import * as setYear from 'date-fns/setYear';
import * as getMonth from 'date-fns/getMonth';
import * as setMonth from 'date-fns/setMonth';
import * as getDate from 'date-fns/getDate';
import * as setDate from 'date-fns/setDate';

@Injectable()
export class BrazilianNgbDateParserFormatter extends NgbDateParserFormatter {

  private static readonly DATE_FORMAT = 'dd/MM/yyyy';

  public parse(dateStr: string): NgbDateStruct {
    if (!dateStr) {
      return {year: null, month: null, day: null};
    }
    const date = parseDate(dateStr, BrazilianNgbDateParserFormatter.DATE_FORMAT, new Date());
    return {
      year: getYear(date),
      month: getMonth(date) + 1,
      day: getDate(date),
    };
  }

  public format(dateStruct: NgbDateStruct): string {
    if (!dateStruct) {
      return '';
    }
    let date = new Date();
    date = setYear(date, dateStruct.year);
    date = setMonth(date, dateStruct.month - 1);
    date = setDate(date, dateStruct.day);
    return formatDate(date, BrazilianNgbDateParserFormatter.DATE_FORMAT);
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
