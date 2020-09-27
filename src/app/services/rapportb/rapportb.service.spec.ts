import { TestBed } from '@angular/core/testing';

import { RapportbService } from './rapportb.service';

describe('RapportbService', () => {
  let service: RapportbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RapportbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
