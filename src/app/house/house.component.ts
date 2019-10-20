import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { MatSliderChange } from '@angular/material';
import { combineLatest, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, mergeMap } from 'rxjs/operators';

import { LatLongService } from '../services/lat-long.service';

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
  timelineWindow = 40;
  timelineMin = new Date().getUTCFullYear() - this.timelineWindow;
  timelineMax = new Date().getUTCFullYear() + this.timelineWindow;
  inThePast = true;

  constructor(private latLongService: LatLongService) {
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

    (this.postalCode = new FormControl('', {
      validators: Validators.compose([
        Validators.required,
        postalCodeValidator
      ]),
      updateOn: 'change'
    })),
      (this.polution = new FormControl()),
      (this.timeline = new FormControl(new Date().getUTCFullYear()));

    this.subscriptions.add(
      combineLatest([
        this.postalCode.valueChanges.pipe(
          debounceTime(300),
          filter(postalCode => checkIfValidPostalCode(postalCode)),
          distinctUntilChanged(),
          mergeMap(postalCode => this.latLongService.getLatLong(postalCode)),
          mergeMap(latLong => this.latLongService.getElevation(latLong))
        ),
        combineLatest([
          this.polution.valueChanges,
          this.timeline.valueChanges
        ]).pipe(map(([polution, timeline]) => {}))
      ])
        .pipe(
          map(([latLong, waterLevel]) => {
            console.log(latLong);
            console.log(waterLevel);
          })
        )
        .subscribe(waterLevelInfo => {})
    );
    this.timeline.setValue('');
    this.polution.setValue(100);
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
