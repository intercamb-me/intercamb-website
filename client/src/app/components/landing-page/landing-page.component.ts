import {Component} from '@angular/core';
import * as Smooch from 'smooch';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {

  constructor() {

  }

  public openChat(): void {
    Smooch.open();
  }
}
