import { TestBed } from '@angular/core/testing';

import { AffectationEquipementService } from './affectation-equipement.service';

describe('AffectationEquipementService', () => {
  let service: AffectationEquipementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffectationEquipementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
