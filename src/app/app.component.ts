import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './ui/templates/main-layout/main-layout.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainLayoutComponent, CommonModule],
  template: `
    @if (isWebsiteRoute) {
      <router-outlet></router-outlet>
    } @else {
      <app-main-layout>
        <router-outlet></router-outlet>
      </app-main-layout>
    }
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class AppComponent {
  title = 'أستاذ اللغة العربية';
  isWebsiteRoute = false;

  private router = inject(Router);

  private websiteRoutes = [
    '/site',
    '/login',
    '/register',
  ];

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isWebsiteRoute = this.websiteRoutes.some(r => event.urlAfterRedirects.startsWith(r));
    });
  }
}
