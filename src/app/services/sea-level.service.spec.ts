/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SeaLevelService } from './sea-level.service';

describe('Service: SeaLevel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeaLevelService]
    });
  });

  it('should ...', inject([SeaLevelService], (service: SeaLevelService) => {
    expect(service).toBeTruthy();
  }));
});
