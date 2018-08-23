import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import * as Chart from 'chart.js';
import * as Smooch from 'smooch';

@Component({
  selector: 'app-index',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  private smoochInitialized: boolean;

  constructor(private router: Router) {

  }

  public ngOnInit(): void {
    Chart.defaults.global.defaultFontFamily = 'Montserrat';
    this.router.events.subscribe((event) => {
      this.onRouteChanged(event);
    });
  }

  private onRouteChanged(event?: any): void {
    if (event && event instanceof NavigationEnd) {
      window.scroll(0, 0);
      if (!this.smoochInitialized && !event.url.startsWith('/clients/form')) {
        this.smoochInitialized = true;
        Smooch.init({
          appId: '5985c40908d768ef00cbb4f1',
          locale: 'pt-BR',
          customText: {
            headerText: 'Como posso te ajudar?',
            inputPlaceholder: 'Digite uma mensagem...',
            sendButtonText: 'Enviar',
            introductionText: 'Estamos aqui para conversar. Sinta-se a vontade para perguntar qualquer coisa.',
          },
        });
      }
    }
  }
}
