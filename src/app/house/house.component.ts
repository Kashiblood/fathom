import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSliderChange, MatSliderModule } from '@angular/material';
import {
  trigger,
  transition,
  style,
  query,
  animateChild,
  group,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit {
  polution = new FormControl(0);
  polutionReduced = false;

  timeline = new FormControl(new Date().getUTCFullYear());
  timelineWindow = 40;
  timelineMin = new Date().getUTCFullYear() - this.timelineWindow;
  timelineMax = new Date().getUTCFullYear() + this.timelineWindow;
  inThePast = false;

  constructor() {}

  ngOnInit() {}

  formatLabel(value: number) {
    return `${Math.abs(value)}%`;
  }

  polutionChanged(event: MatSliderChange) {
    this.polutionReduced = event.value < 0;
  }

  timelineChanged(event: MatSliderChange) {
    this.inThePast = event.value < new Date().getUTCFullYear();
  }
}
