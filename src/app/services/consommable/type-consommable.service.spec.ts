import { TestBed } from '@angular/core/testing';

import { TypeConsommableService } from './type-consommable.service';

describe('TypeConsommableService', () => {
  let service: TypeConsommableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeConsommableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
