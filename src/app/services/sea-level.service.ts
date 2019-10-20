import { Injectable } from '@angular/core';
import * as historicalData from '../../../data/yearlyData.json';
import * as futureHighData from '../../../data/futureHighData.json';
import * as futureLowData from '../../../data/futureLowData.json';

@Injectable({
  providedIn: 'root'
})
export class SeaLevelService {
  constructor() {}

  getSeaLevel(year: number, polution: number, maxPolution: number = 200) {
    if (year > new Date().getUTCFullYear()) {
      const pd = polution / maxPolution;
      const value =
        futureLowData[year] + pd * (futureHighData[year] - futureLowData[year]);
      return value;
    } else {
      return historicalData[year];
    }
  }
}
