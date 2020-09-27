import { TestBed } from '@angular/core/testing';

import { RapportcService } from './rapportc.service';

describe('RapportcService', () => {
  let service: RapportcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RapportcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
