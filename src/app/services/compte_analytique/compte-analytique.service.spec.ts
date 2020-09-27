import { TestBed } from '@angular/core/testing';

import { CompteAnalytiqueService } from './compte-analytique.service';

describe('CompteAnalytiqueService', () => {
  let service: CompteAnalytiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompteAnalytiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
