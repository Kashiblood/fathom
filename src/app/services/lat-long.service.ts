import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface LatLong {
  lat: number;
  long: number;
}

@Injectable({
  providedIn: 'root'
})
export class LatLongService {
  constructor(private http: HttpClient) {}

  getLatLong(postalCode: string): Observable<LatLong> {
    return this.http
      .get<any>(`https://geocode.xyz/${encodeURI(postalCode)}?json=1`)
      .pipe(
        map(response => {
          return {
            lat: response.latt,
            long: response.longt
          };
        })
      );
  }

  getElevation(latLong: LatLong): Observable<number> {
    return this.http
      .get<any>(
        `https://elevation-api.io/api/elevation?points=(${latLong.lat},${latLong.long})`
      )
      .pipe(
        map(response => {
          return response.elevations[0].elevation;
        })
      );
  }
}
