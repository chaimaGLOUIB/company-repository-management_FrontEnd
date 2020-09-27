import { TestBed } from '@angular/core/testing';

import { CategoriePrestationService } from './categorie-prestation.service';

describe('CategoriePrestationService', () => {
  let service: CategoriePrestationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriePrestationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
