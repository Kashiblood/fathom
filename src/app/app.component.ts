import {
  animate,
  animateChild,
  group,
  keyframes,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

const elasticIn = animate(
  '1000ms',
  keyframes([
    style({
      height: '0%',
      width: '0%',
      offset: 0
    }),
    style({
      height: '137%',
      width: '137%',
      offset: 0.14
    }),
    style({
      height: '87%',
      width: '87%',
      offset: 0.28
    }),
    style({
      height: '104%',
      width: '104%',
      offset: 0.42
    }),
    style({
      height: '105%',
      width: '105%',
      offset: 0.44
    }),
    style({
      height: '98%',
      width: '98%',
      offset: 0.58
    }),
    style({
      height: '98%',
      width: '98%',
      offset: 0.6
    }),
    style({
      height: '101%',
      width: '101%',
      offset: 0.72
    }),
    style({
      height: '101%',
      width: '101%',
      offset: 0.74
    }),
    style({
      height: '100%',
      width: '100%',
      offset: 0.82
    }),
    style({
      height: '100%',
      width: '100%',
      offset: 0.86
    }),
    style({
      height: '100%',
      width: '100%',
      offset: 0.92
    }),
    style({
      height: '100%',
      width: '100%',
      offset: 0.96
    }),
    style({
      height: '100%',
      width: '100%',
      offset: 1
    })
  ])
);

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
            '400ms ease-in-out',
            style({
              height: '10vmin',
              width: '60vmin',
              'border-bottom-right-radius': '10vmin',
              overflow: 'hidden'
            })
          ),
          animate(
            '200ms 800ms ease-in-out',
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
          '200ms ease-in-out',
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
          '200ms ease-in-out',
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
          '200ms 300ms ease-in-out',
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
          '300ms 400ms ease-in-out',
          style({
            opacity: 1
          })
        )
      ]),
      transition('phase1 => phase2', [
        animate(
          '300ms ease-in-out',
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
          '300ms 1000ms ease-in-out',
          style({
            opacity: 0
          })
        )
      ])
    ]),

    trigger('earth', [
      state(
        '*',
        style({
          opacity: 0,
          height: '0%',
          width: '0%'
        })
      ),
      state(
        'phase1',
        style({
          opacity: 1,
          height: '100%',
          width: '100%'
        })
      ),
      transition('* => phase1', [
        group([
          animate(
            '1000ms ease-in-out',
            style({
              opacity: 1
            })
          ),
          elasticIn
        ])
      ])
    ]),
    trigger('people', [
      state(
        '*',
        style({
          opacity: 0
        })
      ),
      state(
        'phase1',
        style({
          opacity: 1
        })
      ),
      state(
        'phase2',
        style({
          opacity: 0
        })
      ),
      transition('* => phase1', [
        style({
          opacity: 1
        }),
        query('img', [
          style({
            opacity: 0
          }),
          stagger(200, [
            group([animate('0.5s', style({ opacity: 1 })), elasticIn])
          ]),
          style({
            opacity: 1
          })
        ])
      ]),
      transition('phase1 => phase2', [
        style({
          opacity: 1
        }),
        animate(
          '300ms ease-in-out',
          style({
            opacity: 0
          })
        )
      ])
    ]),
    trigger('polution', [
      state(
        '*',
        style({
          opacity: 0
        })
      ),
      state(
        'phase1',
        style({
          opacity: 1
        })
      ),
      transition('* => phase1', [
        animate(
          '600ms ease-in-out',
          style({
            opacity: 1
          })
        )
      ])
    ]),
    trigger('mouth', [
      state(
        'false',
        style({
          'transform-origin': '0px 330px',
          transform: 'rotateX(0)'
        })
      ),
      state(
        'true',
        style({
          'transform-origin': '0px 330px',
          transform: 'rotateX(180deg)'
        })
      ),
      transition('false => true', [
        animate(
          '300ms ease-in-out',
          style({
            transform: 'rotateX(180deg)'
          })
        )
      ])
    ]),
    trigger('mouth', [
      state(
        'false',
        style({
          'transform-origin': '0px 330px',
          transform: 'rotateX(0)'
        })
      ),
      state(
        'true',
        style({
          'transform-origin': '0px 330px',
          transform: 'rotateX(180deg)'
        })
      ),
      transition('false => true', [
        animate(
          '300ms 1000ms ease-in-out',
          style({
            transform: 'rotateX(180deg)'
          })
        )
      ])
    ]),
    trigger('iceCapsMelt', [
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
      transition('false => true', [
        group([
          query('#north-pole path, #south-pole path#snow', [
            style({
              transform: 'scale(1)'
            }),
            animate(
              '2000ms ease-in-out',
              style({
                transform: 'scale(0.01)'
              })
            ),
            style({
              transform: 'scale(0.01)'
            })
          ])
        ])
      ])
    ]),
    trigger('sweating', [
      state(
        'false',
        style({
          opacity: 0
        })
      ),
      state(
        'true',
        style({
          opacity: 0
        })
      ),
      transition('false => true', [
        style({
          opacity: 1
        }),
        group([
          query('img', [
            style({
              opacity: 0
            }),
            stagger(200, [
              animate(
                '1000ms',
                keyframes([
                  style({ opacity: 1, offset: 0.5 }),
                  style({ opacity: 0, offset: 1.0 })
                ])
              )
            ])
          ]),
          query('img#one', [
            style({
              transform: '*'
            }),
            animate(
              '400ms',
              style({
                transform: 'rotateZ(0deg)'
              })
            )
          ]),
          query('img#two', [
            style({
              transform: '*'
            }),
            animate(
              '400ms 200ms',
              style({
                transform: 'rotateZ(5deg)'
              })
            )
          ]),
          query('img#three', [
            style({
              transform: '*'
            }),
            animate(
              '400ms 400ms',
              style({
                transform: 'rotateZ(-4deg)'
              })
            )
          ]),
          query('img#four', [
            style({
              transform: '*'
            }),
            animate(
              '400ms 600ms',
              style({
                transform: 'rotateZ(-3deg)'
              })
            )
          ])
        ])
      ])
    ]),
    trigger('waterDrop', [
      state(
        '*',
        style({
          opacity: 0,
          transform: 'scale(0.01)'
        })
      ),
      state(
        'phase1',
        style({
          opacity: 1,
          transform: 'scale(1)'
        })
      ),
      state(
        'phase2',
        style({
          opacity: 1,
          transform: 'scale(1) translate(100vh)'
        })
      ),
      transition('* => phase1', [
        animate(
          '1000ms',
          style({
            opacity: 1,
            transform: 'scale(1)'
          })
        )
      ]),
      transition('phase1 => phase2', [
        animate(
          '2000ms',
          style({
            opacity: 1,
            transform: 'scale(1) translateY(100vh)'
          })
        )
      ])
    ]),
    trigger('planetContainer', [
      state(
        'false',
        style({
          transform: 'translateY(0)'
        })
      ),
      state(
        'true',
        style({
          transform: 'translateY(-100vh)'
        })
      ),
      transition('false => true', [
        group([
          query('@waterDrop', [animateChild()]),
          animate(
            '1600ms ease-in-out',
            style({
              opacity: 1,
              transform: 'translateY(-100vh)'
            })
          )
        ])
      ])
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

  earth: 'phase1' | 'phase2' = null;
  people: 'phase1' | 'phase2' = null;
  polution: 'phase1' | 'phase2' = null;
  mouth = false;
  sweating = false;
  iceCapsMelt = false;

  mouthDoneAnimation = false;
  sweatingDoneAnimation = false;
  iceCapsMeltDoneAnimation = false;
  waterDrop: 'phase1' | 'phase2' | 'phase3' = null;
  planetContainer = false;

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
      this.earth = 'phase1';
    }
  }

  earthDone() {
    if (this.start && !this.people) {
      this.people = 'phase1';
    }
  }

  peopleDone() {
    if (this.start && !this.polution) {
      this.polution = 'phase1';
    } else if (this.start && this.people === 'phase2') {
      this.mouth = true;
      this.sweating = true;
      this.iceCapsMelt = true;
      this.waterDrop = 'phase1';
    }
  }

  polutionDone() {
    if (this.start && this.people === 'phase1') {
      this.people = 'phase2';
    }
  }

  mouthDone() {
    if (this.start && this.waterDrop === 'phase1') {
      this.mouthDoneAnimation = true;
      console.log(1);
      if (this.sweatingDoneAnimation && this.iceCapsMeltDoneAnimation) {
        console.log('a');
        this.waterDrop = 'phase2';
        this.planetContainer = true;
      }
    }
  }

  sweatingDone() {
    if (this.start && this.waterDrop === 'phase1') {
      this.sweatingDoneAnimation = true;
      console.log(2);
      if (this.mouthDoneAnimation && this.iceCapsMeltDoneAnimation) {
        console.log('b');
        this.waterDrop = 'phase2';
        this.planetContainer = true;
      }
    }
  }

  iceCapsMeltDone() {
    if (this.start && this.waterDrop === 'phase1') {
      this.iceCapsMeltDoneAnimation = true;
      console.log(3);
      if (this.mouthDoneAnimation && this.sweatingDoneAnimation) {
        console.log('c');
        this.waterDrop = 'phase2';
        this.planetContainer = true;
      }
    }
  }

  waterDropDone() {
    if (this.start && this.waterDrop === 'phase2') {
      // TODO:
    }
  }
}
