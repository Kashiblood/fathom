import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeaLevelService {
  constructor() {}

  getSeaLevel(year: number, polution: number, maxPolution: number = 200) {
    // TODO: this should return the total sea level change from 2004 to the year given
  }
}
