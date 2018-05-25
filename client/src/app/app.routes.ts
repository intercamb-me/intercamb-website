import {Routes} from '@angular/router';

import {MainComponent} from 'app/components/main/main.component';
import {NotFoundComponent} from 'app/components/main/not-found/not-found.component';
import {HomeComponent} from 'app/components/main/home/home.component';

export class AppRoutes {

  public static listRoutes(): Routes {
    return [
      {path: '', component: MainComponent, children: [
        {path: '', component: HomeComponent},
        {path: '**', component: NotFoundComponent},
      ]},
    ];
  }
}
