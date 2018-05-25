import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  public navbarCollapsed = true;
  public loading = true;

  constructor(private router: Router) {

  }

  public ngOnInit(): void {
    this.onRouteChanged();
    this.router.events.subscribe((event) => {
      this.onRouteChanged(event);
    });
  }

  private onRouteChanged(event?: any): void {
    if (event && event instanceof NavigationEnd) {
      window.scroll(0, 0);
    }
  }
}
