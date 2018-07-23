import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
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

@Pipe({name: 'values'})
export class ValuesPipe implements PipeTransform {

  public transform(object: any): any[] {
    const values: any[] = [];
    forEach(object, (value) => {
      values.push(value);
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
export class HyphensIfEmptyPipe implements PipeTransform {

  public transform(object: any): any {
    if (!object || isEmpty(String(object))) {
      return '----';
    }
    return object;
  }
}

@Pipe({name: 'currencySymbol'})
export class CurrencySymbolPipe extends CurrencyPipe implements PipeTransform {

  public transform(currencyCode: string): string {
    const formattedCurrency = super.transform(0, currencyCode, 'symbol', '1.0-2');
    return formattedCurrency.replace(/[0-9]/g, '').trim();
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
      month: Number(dateSplit[1]),
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
