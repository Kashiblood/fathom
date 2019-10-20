/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LatLongService } from './lat-long.service';

describe('Service: LatLong', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LatLongService]
    });
  });

  it('should ...', inject([LatLongService], (service: LatLongService) => {
    expect(service).toBeTruthy();
  }));
});
