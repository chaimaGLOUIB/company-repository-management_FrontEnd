import { TestBed } from '@angular/core/testing';

import { CategorieArretService } from './categorie-arret.service';

describe('CategorieArretService', () => {
  let service: CategorieArretService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieArretService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
