import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { MatSliderChange } from '@angular/material';
import { combineLatest, interval, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, mergeMap, tap } from 'rxjs/operators';

import { LatLongService } from '../services/lat-long.service';
import { SeaLevelService } from '../services/sea-level.service';

interface SeaLevelForm {
  postalCode: string;
  polution: number;
  timeline: number;
}

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit, OnDestroy {
  postalCode: FormControl;
  polution: FormControl;
  timeline: FormControl;

  subscriptions = new Subscription();

  polutionReduced = false;
  // timelineWindow = 40;
  timelineMin = 1993; // new Date().getUTCFullYear() - this.timelineWindow;
  timelineMax = 2100; // new Date().getUTCFullYear() + this.timelineWindow;
  inThePast = true;
  waterLevel = null;
  pixelsPerMilimeter = 1;
  defaultPolution = 100;

  constructor(
    private latLongService: LatLongService,
    private seaLevelService: SeaLevelService
  ) {
    const checkIfValidPostalCode = (postalCode: string): boolean => {
      return (
        typeof postalCode === 'string' &&
        /^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] *\d[A-Z]\d)$/.test(postalCode)
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

    this.subscriptions.add(
      combineLatest([
        this.postalCode.valueChanges.pipe(
          debounceTime(300),
          filter(postalCode => checkIfValidPostalCode(postalCode)),
          distinctUntilChanged(),
          tap(() => console.log('here')),
          mergeMap(postalCode => this.latLongService.getLatLong(postalCode)),
          mergeMap(latLong => this.latLongService.getElevation(latLong))
        ),
        combineLatest([
          this.polution.valueChanges,
          this.timeline.valueChanges
        ]).pipe(
          map(([polution, timeline]) =>
            this.seaLevelService.getSeaLevel(timeline, polution)
          )
        )
      ]).subscribe(([elevation, waterLevel]) => {
        console.log(elevation);
        console.log(waterLevel);
        this.waterLevel = elevation - waterLevel;
      })
    );
    this.timeline.setValue(new Date().getUTCFullYear());
    this.polution.setValue(this.defaultPolution);

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
            if (status === 'VALID') {
              this.polution.enable();
              this.timeline.enable();
            } else {
              this.polution.disable();
              // this.polution.setValue(this.defaultPolution, {
              //   emitEvent: false
              // });

              this.timeline.disable();
              // this.timeline.setValue(new Date().getUTCFullYear(), {
              //   emitEvent: false
              // });
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
    return `${Math.abs(value)}%`;
  }

  polutionChanged(event: MatSliderChange) {
    this.polutionReduced = event.value < 100;
  }

  timelineChanged(event: MatSliderChange) {
    this.inThePast = event.value <= new Date().getUTCFullYear();
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
