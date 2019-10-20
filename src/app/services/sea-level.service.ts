import { Injectable } from '@angular/core';
import { historicalData } from '../data/yearlyData';
import { futureLowData } from '../data/futureLowData';
import { futureHighData } from '../data/futureHighData';

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
      console.log(value);
      return value / 1000;
    } else {
      console.log(historicalData[year].globalMeanVariation);
      return historicalData[year].globalMeanVariation / 1000;
    }
  }
}
