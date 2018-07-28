import {Component, OnInit, Inject, ViewChild, ElementRef, LOCALE_ID} from '@angular/core';
import {FormStyle, getLocaleMonthNames, TranslationWidth} from '@angular/common';
import {forkJoin} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import find from 'lodash-es/find';
import shuffle from 'lodash-es/shuffle';
import random from 'lodash-es/random';
import {Chart} from 'chart.js';
import * as addMonths from 'date-fns/add_months';

import {CompanyService} from 'app/services/company.service';
import {AlertService} from 'app/services/alert.service';
import {CalendarUtils} from 'app/utils/calendar.utils';
import {Helpers} from 'app/utils/helpers';
import {Company} from 'app/models/company.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
})
export class ReportsComponent implements OnInit {

  public company: Company;
  public clientsPerMonthElement: ElementRef<HTMLCanvasElement>;
  public clientsPerPlanElement: ElementRef<HTMLCanvasElement>;
  public billingPerMonthElement: ElementRef<HTMLCanvasElement>;
  public loading = true;

  private clientsPerMonth: any;
  private clientsPerPlan: any;
  private billingPerMonth: any;
  private colors = shuffle(Helpers.getColors());
  private monthsNames = getLocaleMonthNames(this.locale, FormStyle.Standalone, TranslationWidth.Abbreviated);

  constructor(private companyService: CompanyService, private alertService: AlertService, @Inject(LOCALE_ID) private locale: string) {

  }

  public ngOnInit(): void {
    this.companyService.getCompany({populate: 'plans'}).pipe(
      mergeMap((company) => {
        this.company = company;
        return forkJoin([
          this.companyService.getClientsPerMonthReport(),
          this.companyService.getClientsPerPlanReport(),
          this.companyService.getBillingPerMonthReport(),
        ]);
      })
    ).subscribe((result: any[]) => {
      this.clientsPerMonth = result[0];
      this.clientsPerPlan = result[1];
      this.billingPerMonth = result[2];
      this.loading = false;
    }, (err) => {
      this.alertService.apiError(null, err);
    });
  }

  @ViewChild('clientsPerMonth')
  public set setClientsPerMonthElement(elementRef: ElementRef<HTMLCanvasElement>) {
    this.clientsPerMonthElement = elementRef;
    if (elementRef) {
      this.createClientsPerMonthChart();
    }
  }

  @ViewChild('clientsPerPlan')
  public set setClientsPerPlanElement(elementRef: ElementRef<HTMLCanvasElement>) {
    this.clientsPerPlanElement = elementRef;
    if (elementRef) {
      this.createClientsPerPlanChart();
    }
  }

  @ViewChild('billingPerMonth')
  public set setBillingPerMonthElement(elementRef: ElementRef<HTMLCanvasElement>) {
    this.billingPerMonthElement = elementRef;
    if (elementRef) {
      this.createBillingPerMonthChart();
    }
  }

  private createClientsPerMonthChart(): void {
    const lineColor = this.colors[random(0, this.colors.length)];
    const existentData = {};
    this.clientsPerMonth.forEach((register: any) => {
      const date = new Date(register._id.year, register._id.month - 1);
      existentData[CalendarUtils.toDateOnly(date)] = register.count;
    });
    const labels = [];
    const data = [];
    const now = new Date();
    const base = new Date(now.getFullYear(), now.getMonth());
    for (let i = 12; i >= 0; i -= 1) {
      const date = addMonths(base, i * -1);
      const dataKey = CalendarUtils.toDateOnly(date);
      labels.push(this.monthsNames[date.getMonth()]);
      data.push(existentData[dataKey] || 0);
    }
    // tslint:disable-next-line: no-unused-expression
    new Chart(this.clientsPerMonthElement.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data,
          label: 'Clientes no mês',
          backgroundColor: 'transparent',
          borderColor: lineColor,
          borderWidth: 2,
          pointBackgroundColor: lineColor,
          pointRadius: 4,
        }],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1,
            },
          }],
        },
      },
    });
  }

  private createClientsPerPlanChart(): void {
    const labels: string[] = [];
    const data: any[] = [];
    this.clientsPerPlan.forEach((register: any) => {
      const plan = find(this.company.plans, (currentPlan) => {
        return currentPlan.id === register._id;
      });
      labels.push(plan ? plan.name : 'Sem plano');
      data.push(register.count);
    });
    // tslint:disable-next-line: no-unused-expression
    new Chart(this.clientsPerPlanElement.nativeElement, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: this.colors,
        }],
      },
    });
  }

  private createBillingPerMonthChart(): void {
    const barColor = this.colors[random(0, this.colors.length)];
    const existentData = {};
    this.billingPerMonth.forEach((register: any) => {
      const date = new Date(register._id.year, register._id.month - 1);
      existentData[CalendarUtils.toDateOnly(date)] = register.amount;
    });
    const labels = [];
    const data = [];
    const now = new Date();
    const base = new Date(now.getFullYear(), now.getMonth());
    for (let i = 12; i >= 0; i -= 1) {
      const date = addMonths(base, i * -1);
      const dataKey = CalendarUtils.toDateOnly(date);
      labels.push(this.monthsNames[date.getMonth()]);
      data.push(existentData[dataKey] || 0);
    }
    // tslint:disable-next-line: no-unused-expression
    new Chart(this.billingPerMonthElement.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          data,
          label: 'Faturamento no mês',
          backgroundColor: barColor,
        }],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
    });
  }
}
