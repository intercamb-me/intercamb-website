import {Component, OnInit} from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-index',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor() {

  }

  public ngOnInit(): void {
    Chart.defaults.global.defaultFontFamily = 'Montserrat';
  }
}
