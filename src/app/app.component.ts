import { animate, animateChild, group, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('demo', [
      transition('* => true', [
        query('@teamPage', group([animateChild()]))
        // TODO: each page here (should make it easier to test)
      ])
    ]),
    trigger('teamPage', [
      state(
        'true',
        style({
          height: '10vmin',
          width: '80vmin',
          'border-bottom-right-radius': '10vmin',
          overflow: 'hidden'
        })
      ),
      transition('* => true', [
        query('@logo', group([animateChild()])),
        query('@teamName', group([animateChild()])),
        query('@teamMembers', group([animateChild()])),
        group([
          animate(
            '400ms ease-out',
            style({
              height: '10vmin',
              width: '80vmin',
              'border-bottom-right-radius': '10vmin',
              overflow: 'hidden'
            })
          )
          // query('.logo', [
          //   animate(
          //     '400ms ease-out',
          //     style({
          //       width: '6vmin',
          //       top: '20%'
          //     })
          //   )
          // ])
          // query('.team-name', [
          //   style({
          //     'font-size': '6vmin',
          //     top: 'calc(20% - 2vmin)'
          //   }),
          //   animate(
          //     '400ms ease-out',
          //     style({
          //       'font-size': '6vmin',
          //       top: 'calc(20% - 2vmin)'
          //     })
          //   )
          // ])
        ])
      ])
    ]),
    trigger('logo', [
      state(
        'false',
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
        'true',
        style({
          opacity: 1,
          width: '10vmin',
          color: 'white',
          position: 'absolute',
          top: 'calc(20% - 5vmin)',
          left: 'calc(15% - 5vmin)'
        })
      ),
      transition('false => true', [
        animate(
          '200ms ease-out',
          style({
            opacity: 1,
            width: '20vmin',
            color: 'white',
            position: 'absolute',
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
        'false',
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
        'true',
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
      transition('* => true', [
        style({
          opacity: 0
        }),
        animate(
          '300ms 400ms ease-out',
          style({
            opacity: 1
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
    trigger('subtitles', [])
  ]
})
export class AppComponent {
  showSubtitles = new FormControl(false);
  start = false;

  constructor() {}
}
