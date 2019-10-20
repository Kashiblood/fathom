import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { MatSliderChange } from '@angular/material';
import { combineLatest, interval, merge, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, mergeMap, shareReplay, tap } from 'rxjs/operators';

import { LatLongService } from '../services/lat-long.service';
import { SeaLevelService } from '../services/sea-level.service';

interface SeaLevelForm {
  postalCode: string;
  polution: number;
  timeline: number;
}

interface LocationData {
  elevation: number;
  seaLevel: number;
}

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate(
          `300ms ease-in-out`,
          style({
            opacity: 1
          })
        )
      ]),
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate(
          `250ms ease-in-out`,
          style({
            opacity: 0
          })
        )
      ])
    ]),
    trigger('slideScaleOpenClose', [
      transition(':enter', [
        style({
          width: '0px',
          transform: 'scale(0.01)'
        }),
        animate(
          `200ms ease-in-out`,
          style({
            width: '{{size}}',
            transform: 'scale(1)'
          })
        )
      ]),
      transition(':leave', [
        style({
          width: '{{size}}',
          transform: 'scale(1)'
        }),
        animate(
          `200ms ease-in-out`,
          style({
            width: '0px',
            transform: 'scale(0.01)'
          })
        )
      ])
    ])
  ]
})
export class HouseComponent implements OnInit, OnDestroy {
  postalCode: FormControl;
  polution: FormControl;
  timeline: FormControl;

  subscriptions = new Subscription();

  polutionReduced = false;
  // TODO: switch this to getting timeline min/max from SeaLevelService.
  // timelineWindow = 40;
  timelineMin = 1993; // new Date().getUTCFullYear() - this.timelineWindow;
  timelineMax = 2100; // new Date().getUTCFullYear() + this.timelineWindow;
  inThePast = true;
  locationData: Observable<LocationData>;
  pixelsPerMeter = 20;
  defaultPolution = 100;
  preloading = false;
  loading = false;

  constructor(
    private latLongService: LatLongService,
    private seaLevelService: SeaLevelService
  ) {
    const checkIfValidPostalCode = (postalCode: string): boolean => {
      return (
        typeof postalCode === 'string' &&
        (/^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] *\d[A-Z]\d)$/.test(postalCode) ||
          /^([1-9][0-9]{3}\s?[a-zA-Z]{2})$/.test(postalCode))
      );
    };

    const postalCodeValidator = (
      control: AbstractControl
    ): ValidationErrors | null => {
      if (checkIfValidPostalCode(control.value)) {
        return null;
      } else {
        return { invalidPostalCode: { value: control.value } };
      }
    };

    this.postalCode = new FormControl('', {
      validators: Validators.compose([
        Validators.required,
        postalCodeValidator
      ]),
      updateOn: 'change'
    });
    this.polution = new FormControl('');
    this.timeline = new FormControl(new Date().getUTCFullYear());

    this.locationData = combineLatest([
      this.postalCode.valueChanges.pipe(
        debounceTime(300),
        tap(a => {
          this.preloading = true;
          console.log('there', a);
        }),
        filter(postalCode => checkIfValidPostalCode(postalCode)),
        tap(a => {
          this.loading = true;
          console.log('here', a);
        }),
        mergeMap(postalCode => this.latLongService.getLatLong(postalCode)),
        mergeMap(latLong => this.latLongService.getElevation(latLong)),
        tap(() => {
          if (this.inThePast) {
            this.polution.disable();
          } else {
            this.polution.enable();
          }

          this.timeline.enable();
        })
      ),
      combineLatest([
        this.polution.valueChanges,
        this.timeline.valueChanges
      ]).pipe(
        map(([polution, timeline]) =>
          this.seaLevelService.getSeaLevel(timeline, polution)
        ),
        distinctUntilChanged()
      )
    ]).pipe(
      map(([elevation, seaLevel]) => {
        console.log('at end');
        this.preloading = false;
        this.loading = false;
        return {
          elevation: elevation - seaLevel,
          seaLevel
        };
      }),
      shareReplay()
    );
    this.timeline.setValue(new Date().getUTCFullYear());
    this.polution.setValue(this.defaultPolution);
    this.polution.disable();

    // TODO: This merge with interval is due to a bug with form controls not sending initial status,
    // remove when the following is fixed: https://github.com/angular/angular/issues/14542
    this.subscriptions.add(
      merge(
        interval(250).pipe(map(() => this.postalCode.status)),
        this.postalCode.statusChanges
      )
        .pipe(
          distinctUntilChanged(),
          tap(status => {
            if (status !== 'VALID') {
              this.polution.disable();
              this.timeline.disable();
            }
          })
        )
        .subscribe()
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  formatLabel(value: number) {
    return `${Math.abs(value) - 100}%`;
  }

  polutionChanged(event: MatSliderChange) {
    this.polutionReduced = event.value < 100;
  }

  timelineChanged(event: MatSliderChange) {
    this.inThePast = event.value <= new Date().getUTCFullYear();
    if (this.inThePast) {
      this.polution.disable();
    } else {
      this.polution.enable();
    }
  }

  clearPostalCodeError() {
    this.postalCode.setErrors({
      invalidPostalCode: null
    });
  }

  getPostalCodeErrorMessage() {
    return this.postalCode.hasError('required')
      ? `Postal code is required.`
      : this.postalCode.hasError('invalidPostalCode')
      ? `Invalid postal code.`
      : null;
  }
}
