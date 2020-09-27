import { TestBed } from '@angular/core/testing';

import { HorairePosteService } from './horaire-poste.service';

describe('HorairePosteService', () => {
  let service: HorairePosteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorairePosteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
