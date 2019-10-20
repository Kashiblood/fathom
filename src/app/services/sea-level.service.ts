import { Injectable } from '@angular/core';

import { futureHighData } from '../data/futureHighData';
import { futureLowData } from '../data/futureLowData';
import { historicalData } from '../data/yearlyData';

@Injectable({
  providedIn: 'root'
})
export class SeaLevelService {
  constructor() {}

  getSeaLevel(
    year: number,
    polution: number,
    maxPolution: number = 200
  ): number {
    if (year > new Date().getUTCFullYear()) {
      const pd = polution / maxPolution;
      const value =
        futureLowData[year] + pd * (futureHighData[year] - futureLowData[year]);
      console.log('future data', value);
      return value / 1000;
    } else {
      console.log('historical data', historicalData[year].globalMeanVariation);
      return historicalData[year].globalMeanVariation / 1000;
    }
  }
}
