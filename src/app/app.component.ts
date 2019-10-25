import { animate, animateChild, group, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('teamPage', [
      state(
        'false',
        style({
          height: '100%',
          width: '100%',
          'border-bottom-right-radius': '0',
          overflow: 'hidden'
        })
      ),
      state(
        'true',
        style({
          height: '10vmin',
          width: '60vmin',
          'border-bottom-right-radius': '10vmin',
          overflow: 'hidden',
          opacity: 0
        })
      ),
      transition('* => true', [
        group([
          query('@*', animateChild()),
          animate(
            '400ms ease-out',
            style({
              height: '10vmin',
              width: '60vmin',
              'border-bottom-right-radius': '10vmin',
              overflow: 'hidden'
            })
          ),
          animate(
            '200ms 800ms ease-out',
            style({
              opacity: 0
            })
          )
        ])
      ])
    ]),
    trigger('logo', [
      state(
        '*',
        style({
          opacity: 0,
          width: '20vmin',
          color: 'white',
          position: 'absolute',
          top: 'calc(50% - 10vmin)',
          left: 'calc(50% - 10vmin)'
        })
      ),
      state(
        'phase1',
        style({
          opacity: 1,
          width: '10vmin',
          color: 'white',
          position: 'absolute',
          top: 'calc(20% - 5vmin)',
          left: 'calc(15% - 5vmin)'
        })
      ),
      state(
        'phase2',
        style({
          opacity: 1,
          color: 'white',
          position: 'absolute',
          left: 'calc(15% - 5vmin)',

          width: '6vmin',
          top: 'calc(20%)'
        })
      ),
      transition('* => phase1', [
        animate(
          '200ms ease-out',
          style({
            opacity: 1,
            top: 'calc(50% - 10vmin)',
            left: 'calc(50% - 10vmin)'
          })
        ),
        query('@crack', group([animateChild()])),
        group([
          animate(
            '400ms 400ms ease-in-out',
            style({
              width: '10vmin'
            })
          ),
          animate(
            '400ms 400ms ease-in',
            style({
              top: 'calc(20% - 5vmin)'
            })
          ),
          animate(
            '400ms 400ms ease-out',
            style({
              left: 'calc(15% - 5vmin)'
            })
          )
        ])
      ]),
      transition('phase1 => phase2', [
        animate(
          '200ms ease-out',
          style({
            opacity: 1,
            width: '6vmin',
            top: 'calc(20%)'
          })
        )
      ])
    ]),
    trigger('crack', [
      state(
        'false',
        style({
          opacity: 1
        })
      ),
      state(
        'true',
        style({
          opacity: 0
        })
      ),
      transition('* => true', [
        style({
          opacity: 1
        }),
        animate(
          '200ms 300ms ease-out',
          style({
            opacity: 0
          })
        )
      ])
    ]),
    trigger('teamName', [
      state(
        '*',
        style({
          opacity: 0,
          position: 'absolute',
          top: 'calc(20% - 5vmin)',
          left: 'calc(15% + 6vmin)',
          'font-size': '10vmin',
          'line-height': '10vmin',
          color: 'white',
          'font-weight': 700
        })
      ),
      state(
        'phase1',
        style({
          opacity: 1,
          position: 'absolute',
          top: 'calc(20% - 5vmin)',
          left: 'calc(15% + 6vmin)',
          'font-size': '10vmin',
          'line-height': '10vmin',
          color: 'white',
          'font-weight': 700
        })
      ),
      state(
        'phase2',
        style({
          opacity: 1,
          position: 'absolute',
          left: 'calc(15% + 3vmin)',
          'line-height': '6vmin',
          color: 'white',
          'font-weight': 700,
          'font-size': '6vmin',
          top: '20%'
        })
      ),
      transition('* => phase1', [
        style({
          opacity: 0
        }),
        animate(
          '300ms 400ms ease-out',
          style({
            opacity: 1
          })
        )
      ]),
      transition('phase1 => phase2', [
        animate(
          '300ms ease-out',
          style({
            left: 'calc(15% + 3vmin)',
            'font-size': '6vmin',
            top: 'calc(20% - 2vmin)'
          })
        )
      ])
    ]),
    trigger('teamMembers', [
      state(
        'false',
        style({
          opacity: 0,
          position: 'absolute',
          top: '30%',
          left: '15%'
        })
      ),
      state(
        'true',
        style({
          opacity: 0,
          position: 'absolute',
          top: '30%',
          left: '15%'
        })
      ),
      transition('* => true', [
        style({
          opacity: 1
        }),
        query('h2', [
          style({
            opacity: 0
          }),
          stagger(200, [animate('0.5s', style({ opacity: 1 }))])
        ]),
        animate(
          '300ms 1000ms ease-out',
          style({
            opacity: 0
          })
        )
      ])
    ]),

    trigger('earth', [
      state(
        'false',
        style({
          opacity: 0,
          position: 'absolute'
        })
      )
    ]),

    trigger('subtitles', [])
  ]
})
export class AppComponent {
  showSubtitles = new FormControl(false);
  start = false;
  logo: 'phase1' | 'phase2' = null;
  teamName: 'phase1' | 'phase2' = null;
  teamMembers = false;
  teamPage = false;

  earth = false;

  constructor() {}

  logoDone() {
    if (this.start && !this.teamPage) {
      this.teamName = 'phase1';
    }
  }

  teamNameDone() {
    if (this.start) {
      this.teamMembers = true;
    }
  }

  teamMembersDone() {
    if (this.start) {
      this.logo = 'phase2';
      this.teamName = 'phase2';
      this.teamPage = true;
    }
  }

  teamPageDone() {
    if (this.start) {
    }
  }

  earthDone() {
    if (this.start) {
    }
  }
}
