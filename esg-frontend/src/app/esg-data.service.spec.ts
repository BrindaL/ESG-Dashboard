import { TestBed } from '@angular/core/testing';

import { EsgDataService } from './esg-data.service';

describe('EsgDataService', () => {
  let service: EsgDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsgDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
