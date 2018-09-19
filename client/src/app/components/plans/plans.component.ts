import {Component} from '@angular/core';
import * as Smooch from 'smooch';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
})
export class PlansComponent {

  public mensalPrice = true;

  constructor() {

  }

  public setMensalPrice(mensalPrice: boolean): void {
    this.mensalPrice = mensalPrice;
  }

  public openChat(): void {
    Smooch.open();
  }
}
