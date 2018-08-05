import {Component, OnInit} from '@angular/core';
import * as Chart from 'chart.js';
import * as Smooch from 'smooch';

@Component({
  selector: 'app-index',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor() {

  }

  public ngOnInit(): void {
    Chart.defaults.global.defaultFontFamily = 'Montserrat';
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
