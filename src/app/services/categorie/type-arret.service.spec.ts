import { TestBed } from '@angular/core/testing';

import { TypeArretService } from './type-arret.service';

describe('TypeArretService', () => {
  let service: TypeArretService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeArretService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
