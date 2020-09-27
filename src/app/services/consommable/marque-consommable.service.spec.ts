import { TestBed } from '@angular/core/testing';

import { MarqueConsommableService } from './marque-consommable.service';

describe('MarqueConsommableService', () => {
  let service: MarqueConsommableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarqueConsommableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
