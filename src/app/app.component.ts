import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { routes } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('intro', [
      state(
        'true',
        style({
          height: '48px',
          opacity: 0,
          display: 'none'
        })
      ),
      transition('* => true', [
        style({ height: '100%', opacity: 1 }),
        animate('200ms ease-out', style({ height: '48px' })),
        animate('200ms ease-out', style({ opacity: 0 }))
      ]),
      transition('* => false', [
        style({ height: '48px' }),
        animate('200ms ease-out', style({ height: '100%' }))
      ])
    ]),
    trigger('showContent', [
      state(
        'false',
        style({
          opacity: 0
        })
      ),
      state(
        'true',
        style({
          opacity: 1
        })
      ),
      transition('* => true', [
        style({ opacity: 0 }),
        animate('200ms 400ms ease-out', style({ opacity: 1 }))
      ]),
      transition('* => false', [
        style({ opacity: 1 }),
        animate('200ms 400ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('routeAnimations', [
      transition('house => furryFriends', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%'
          })
        ]),
        query(':enter', [style({ right: '-100%' })]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ right: '100%' }))
          ]),
          query(':enter', [animate('300ms ease-out', style({ right: '0%' }))])
        ]),
        query(':enter', animateChild())
      ]),
      transition('furryFriends => house', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          })
        ]),
        query(':enter', [style({ left: '-100%' })]),
        query(':leave', animateChild()),
        group([
          query(':leave', [animate('300ms ease-out', style({ left: '100%' }))]),
          query(':enter', [animate('300ms ease-out', style({ left: '0%' }))])
        ]),
        query(':enter', animateChild())
      ])
    ])
  ]
})
export class AppComponent {
  readonly navRoutes = routes.filter(
    route => route.path !== '' && route.path !== '**'
  );
  loaded = false;

  @HostListener('window:finishedLoadingAnimation')
  finishedLoadingAnimationListener() {
    this.loaded = true;
  }

  constructor() {}

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
